
import validatorMiddleware from "../middlewares/validator.middleware";
import { body, param } from "express-validator";


class CartsValidation {

    checkProduct = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        body("items.product").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]

    removeOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]


}

const cartsValidation = new CartsValidation();

export default cartsValidation