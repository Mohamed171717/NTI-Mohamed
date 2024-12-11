
import { Request, Response , NextFunction } from "express";
import subcategoriesSchema from "./subcategories.schema";
import { Subcategories } from "./subcategories.interface";
import refactorService from "../refactor.service";


class SubcategoriesService {

    setCategoryId( req: Request, res: Response, next: NextFunction ) {
        if( req.params.categoryId && !req.body.category) req.body.category = req.params.categoryId;
        next();
    }
    filterSubcategories( req: Request, res: Response, next: NextFunction ) {
        const filterData: any ={};
        if( req.params.categoryId) filterData.category = req.params.categoryId;
        req.filterData = filterData;
        next();
    }

    getAllSubcategories = refactorService.getAll<Subcategories>(subcategoriesSchema);

    createSubcategory = refactorService.createOne<Subcategories>(subcategoriesSchema);

    getSubcategory = refactorService.getOne<Subcategories>(subcategoriesSchema);

    updateSubcategory = refactorService.updateOne<Subcategories>(subcategoriesSchema);

    deleteSubcategory = refactorService.deleteOne<Subcategories>(subcategoriesSchema);

}

const subcategoriesService = new SubcategoriesService();
export default subcategoriesService;