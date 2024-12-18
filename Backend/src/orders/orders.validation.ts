
import validatorMiddleware from "../middlewares/validator.middleware";
import ordersSchema from "./orders.schema";
import { body, param } from "express-validator";


class OrdersValidation {
    createOne = [ body("name").notEmpty()
        .withMessage((val, {req}) => req.__("validation_field"))
        .isLength({min: 2, max: 50})
        .withMessage((val, {req}) => req.__('validation_length_short'))
        .custom( async (val: string, {req}) => {
            const category = await ordersSchema.findOne({ name: val});
            if(category) throw new Error (`${req.__('validation_value')}`);
            return true;
        }), validatorMiddleware]

    updateOne = [ param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body("name").optional()
        .isLength({min: 2, max: 50})
        .withMessage((val, {req}) => req.__('validation_length_short'))
        .custom( async (val: string, {req}) => {
            const category = await ordersSchema.findOne({ name: val});
            if(category && category._id!.toString() !== req.params?.id.toString()) throw new Error (`${req.__('validation_value')}`);
            return true;
        }), validatorMiddleware]

    deleteOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
    
    getOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]

}

const ordersValidation = new OrdersValidation();

export default ordersValidation