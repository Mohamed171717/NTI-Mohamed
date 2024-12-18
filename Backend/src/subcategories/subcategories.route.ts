
import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subCategoriesValidation from "./subcategories.validation";
import authService from "../auth/auth.service";

const subcategoriesRouter: Router = Router({ mergeParams: true });

subcategoriesRouter.route('/')
.get( subcategoriesService.filterSubcategories, subcategoriesService.getAllSubcategories )
.post(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), subcategoriesService.setCategoryId, subCategoriesValidation.createOne, subcategoriesService.createSubcategory )

subcategoriesRouter.route('/:id')
.get( subCategoriesValidation.getOne, subcategoriesService.getSubcategory )
.put(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), subCategoriesValidation.updateOne, subcategoriesService.updateSubcategory )
.delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), subCategoriesValidation.deleteOne, subcategoriesService.deleteSubcategory )


export default subcategoriesRouter;


