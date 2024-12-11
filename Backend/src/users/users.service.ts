import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import usresSchema from "./users.schema";
import refactorService from "../refactor.service";
import ApiErrors from "../utilities/apiErrors";
import { Users } from "./users.interface";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";


class UsersService {

    getAllUsers = refactorService.getAll<Users>(usresSchema);

    createUsers = refactorService.createOne<Users>(usresSchema);

    getUsers = refactorService.getOne<Users>(usresSchema);

    updateUsers = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findByIdAndUpdate( req.params.id, 
            { name: req.body.name, image: req.body.image, active: req.body.active}, 
            { new: true});
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: user });
    })
    
    deleteUsers = refactorService.deleteOne<Users>(usresSchema);

    changePassword = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findByIdAndUpdate( req.params.id, 
            { 
                password: req.body.password, 
                passwordChangedAt: Date.now()
            },{ new: true});
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: user });
    })

    uploadImage = uploadSingleFile( ['image'], 'image')
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(500, 350)
                .webp({quality: 95}) 
                .toFile(`uploads/images/products/${fileName}`)
            req.body.image = fileName;
        }
        next();
    } 
    
}

const usersService = new UsersService();
export default usersService;
// or you can use export default new CategoriesService;