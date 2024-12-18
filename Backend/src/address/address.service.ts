import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import usresSchema from "../users/users.schema";
import ApiErrors from "../utilities/apiErrors";
import { Users } from "../users/users.interface";


class AddressService {

    getAddress = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findById( req.user._id )
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length , data: user.address});
    });

    addAddress = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findById( req.user._id, {$addToSet: {address: req.body.address}}, {new: true})
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length , data: user.address});
    });

    removeAddress = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
        const user: Users | null = await usresSchema.findById( req.user._id, {$pull: {address: {_id: req.body.address}}}, {new: true})
        if(!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length , data: user.address});
    });
    
}

const addresstService = new AddressService();
export default addresstService;
// or you can use export default new CategoriesService;