import { Request, Response , NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler";


class CategoriesService {

    getAll = asyncHandler(
        async ( req: Request, res: Response, next: NextFunction ) => {
        const categories: Categories[] = await categoriesSchema.find();
        res.status(200).json({ data: categories });
        }
    )

    createOne = asyncHandler( async  ( req: Request, res: Response, next: NextFunction) => {
        const newCategory = await categoriesSchema.create(req.body)
        res.status(201).json({ data: newCategory})
        }
    )

    getOne = asyncHandler( async  ( req: Request, res: Response, next: NextFunction) => {
        const newCategory: Categories | null = await categoriesSchema.findById(req.params.id)
        res.status(200).json({ data: newCategory})
        }
    )
    updateOne = asyncHandler( async  ( req: Request, res: Response, next: NextFunction) => {
        const newCategory: Categories | null = await categoriesSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({ data: newCategory})
        }
    )
    deleteOne = asyncHandler( async  ( req: Request, res: Response, next: NextFunction) => {
        const newCategory: Categories | null = await categoriesSchema.findByIdAndDelete(req.params.id)
        res.status(204).json()
        }
    )

}

const categoriesService = new CategoriesService();
export default categoriesService;
// or you can use export default new CategoriesService;