
import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subCategoriesValidation from "./subcategories.validation";

const subcategoriesRouter: Router = Router({ mergeParams: true });

subcategoriesRouter.route('/')
.get( subcategoriesService.filterSubcategories, subcategoriesService.getAllSubcategories )
.post( subcategoriesService.setCategoryId, subCategoriesValidation.createOne, subcategoriesService.createSubcategory )

subcategoriesRouter.route('/:id')
.get( subCategoriesValidation.getOne, subcategoriesService.getSubcategory )
.put( subCategoriesValidation.updateOne, subcategoriesService.updateSubcategory )
.delete( subCategoriesValidation.deleteOne, subcategoriesService.deleteSubcategory )


export default subcategoriesRouter;


