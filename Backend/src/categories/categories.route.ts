
import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.route";
import categoriesValidation from "./categories.validation";
import authService from "../auth/auth.service";

const categoriesRouter: Router = Router();

// /api/v1/categories/:categoryid/subcategories
categoriesRouter.use( "/:categoryId/subcategories", subcategoriesRouter )

categoriesRouter.route('/')
.get(categoriesService.getAllCategories)
.post(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), categoriesValidation.createOne, categoriesService.createCategory)

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne, categoriesService.getCategory)
.put(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), categoriesValidation.updateOne, categoriesService.updateCategory)
.delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), categoriesValidation.deleteOne, categoriesService.deleteCategory)


export default categoriesRouter;

