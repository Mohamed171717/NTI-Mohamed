import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import usresSchema from "../users/users.schema";
import refactorService from "../refactor.service";
import ApiErrors from "../utilities/apiErrors";
import { Users } from "../users/users.interface";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import createTokens from "../utilities/tokens";
import sanitization from "../utilities/sanitization";


class UsersService {

    setUserId = ( req: Request, res: Response, next: NextFunction ) => {
        req.params.id = req.user?._id;
        next();
    }
    getProfile = refactorService.getOne<Users>(usresSchema, "users");

    updateProfile = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findByIdAndUpdate( req.params.id, 
            { name: req.body.name, image: req.body.image, active: req.body.active}, 
            { new: true});
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: sanitization.User(user) });
    })
    
    deleteProfile = refactorService.deleteOne<Users>(usresSchema);

    createPassword = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findOneAndUpdate( {_id: req.params.id, hasPassword: false}, 
            { password: await bcrypt.hash(req.body.password, 13)},{ new: true});
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: sanitization.User(user) });
    })

    changePassword = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findByIdAndUpdate( req.params.id, 
            { 
                password: await bcrypt.hash(req.body.password, 13), 
                passwordChangedAt: Date.now()
            },{ new: true});
            const token = createTokens.accessToken(user?._id, user?.role!)
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ token,  data: sanitization.User(user) });
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