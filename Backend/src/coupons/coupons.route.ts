
import { Router } from "express";
import couponsService from "./coupons.service";
import couponsValidation from "./coupons.validation";
import authService from "../auth/auth.service";

const couponsRouter: Router = Router();

// /api/v1/categories/:categoryid/subcategories
couponsRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"))

couponsRouter.route('/')
.get(couponsService.getAllCoupons)
.post(couponsValidation.createOne, couponsService.createCoupons)

couponsRouter.route('/:id')
.get(couponsValidation.getOne, couponsService.getCoupons)
.put(couponsValidation.updateOne, couponsService.updateCoupons)
.delete(couponsValidation.deleteOne, couponsService.deleteCoupons)


export default couponsRouter;

