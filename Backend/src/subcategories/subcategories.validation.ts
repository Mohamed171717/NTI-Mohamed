import validatorMiddleware from "../middlewares/validator.middleware";
import { body, param } from "express-validator";
import subcategoriesSchema from "./subcategories.schema";
import categoriesSchema from "../categories/categories.schema";


class SubcategoriesValidation {
    createOne = [ 
        body("name")
            .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
            .isLength({min: 2, max: 50}),
        body("category")
            .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom( async (val: string, {req}) => {
                const category = await categoriesSchema.findById(val);
                if(!category) throw new Error (`${req.__('validation_value')}`);
                return true;
            })
        , validatorMiddleware]

    updateOne = [ 
        param("id")
            .isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body("name")
            .isLength({min: 2, max: 50}).withMessage("Invalid Length"),
        body("category")
            .optional().isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
            .custom( async (val: string, {req}) => {
                const category = await categoriesSchema.findById(val);
                if(!category) throw new Error (`${req.__('validation_value')}`);
                return true;
            })
        , validatorMiddleware]

    deleteOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
    
    getOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]

}

const subCategoriesValidation = new SubcategoriesValidation();

export default subCategoriesValidation