
import validatorMiddleware from "../middlewares/validator.middleware";
import couponsSchema from "./coupons.schema";
import { body, param } from "express-validator";


class CouponsValidation {
    createOne = [ 
        body("name").notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isLength({min: 2, max: 50})
        .withMessage((val, {req}) => req.__('validation_length_short')),
        body("discout").notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isFloat({min: 1, max:100})
        .withMessage((val, {req}) => req.__('validation_value')),
        body("expireTime").notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isDate().withMessage((val, {req}) => req.__('validation_value'))   // in create write year/month/day
        , validatorMiddleware]

    updateOne = [ 
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body("name").optional().isLength({min: 2, max: 50})
        .withMessage((val, {req}) => req.__('validation_length_short')),
        body("discout").optional()
        .isFloat({min: 1, max:100})
        .withMessage((val, {req}) => req.__('validation_value')),
        body("expireTime").optional()
        .isDate().withMessage((val, {req}) => req.__('validation_value'))
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

const couponsValidation = new CouponsValidation();

export default couponsValidation