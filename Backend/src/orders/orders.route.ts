
import { Router } from "express";
import ordersService from "./orders.service";
import ordersValidation from "./orders.validation";
import authService from "../auth/auth.service";

const ordersRouter: Router = Router();

ordersRouter.use( authService.protectedRoutes, authService.checkActive);

ordersRouter.route('/')
.get(ordersService.getAllOrders)
.post(authService.allowedTo("user"), ordersValidation.createOne, ordersService.createCashOrder)

ordersRouter.put('/:id/deliver', authService.allowedTo("admin", "employee"), ordersService.deliverOrder)
ordersRouter.put('/:id/payment', authService.allowedTo("admin", "empolyee"), ordersService.payOrder)


export default ordersRouter;

