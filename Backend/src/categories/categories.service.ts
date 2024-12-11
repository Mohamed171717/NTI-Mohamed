import { Request, Response , NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import refactorService from "../refactor.service";


class CategoriesService {

    getAllCategories = refactorService.getAll<Categories>(categoriesSchema);

    createCategory = refactorService.createOne<Categories>(categoriesSchema);

    getCategory = refactorService.getOne<Categories>(categoriesSchema);

    updateCategory = refactorService.updateOne<Categories>(categoriesSchema);

    deleteCategory = refactorService.deleteOne<Categories>(categoriesSchema);

}

const categoriesService = new CategoriesService();
export default categoriesService;
// or you can use export default new CategoriesService;