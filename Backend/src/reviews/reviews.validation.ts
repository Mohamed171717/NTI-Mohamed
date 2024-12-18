
import validatorMiddleware from "../middlewares/validator.middleware";
import reviewsSchema from "./reviews.schema";
import { body, param } from "express-validator";


class ReviewsValidation {
    createOne = [ 
        body("comment")
        .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isLength({min: 2, max: 150}).withMessage((val, {req}) => req.__('validation_length_medium')),
        body("rate")
        .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isFloat({min: 1, max:5}).withMessage((val, {req}) => req.__('validation_value')),
        body("user")
        .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isMongoId().withMessage((val, {req}) => req.__('invavalidation_value')),
        body("product")
        .notEmpty().withMessage((val, {req}) => req.__("validation_field"))
        .isMongoId().withMessage((val, {req}) => req.__('invavalidation_value'))
        .custom( async (val: string, {req}) => {
            const review = await reviewsSchema.findOne({user: req.user._id, product: val});
            if(review) throw new Error (`${req.__('invalid_review')}`);
            return true;
        })
    , validatorMiddleware]

    updateOne = [ 
        param("id")
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom( async (val: string, {req}) => {
            const review = await reviewsSchema.findById(val);
            if(review?.user._id,toString() !== req.user._id.toString()) throw new Error (`${req.__('can_not_review_U')}`);
            return true;
        }),
        body("comment")
        .optional().isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        body("rate")
        .optional()
        .isFloat({min: 1, max:5}).withMessage((val, {req}) => req.__('validation_value'))
    , validatorMiddleware]

    deleteOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom( async (val: string, {req}) => {
            if (req.user.role === 'user') {
                const review = await reviewsSchema.findById(val);
                if(review?.user._id,toString() != req.user._id.toString()) throw new Error (`${req.__('can_not_review_D')}`);
            }
            return true;
        })
    , validatorMiddleware
    ]
    
    getOne = [
        param("id").isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]

}

const reviewsValidation = new ReviewsValidation();

export default reviewsValidation