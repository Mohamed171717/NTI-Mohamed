
import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.route";
import categoriesValidation from "./categories.validation";

const categoriesRouter: Router = Router();

// /api/v1/categories/:categoryid/subcategories
categoriesRouter.use( "/:categoryId/subcategories", subcategoriesRouter )

categoriesRouter.route('/')
.get(categoriesService.getAllCategories)
.post(categoriesValidation.createOne, categoriesService.createCategory)

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne, categoriesService.getCategory)
.put(categoriesValidation.updateOne, categoriesService.updateCategory)
.delete(categoriesValidation.deleteOne, categoriesService.deleteCategory)


export default categoriesRouter;

