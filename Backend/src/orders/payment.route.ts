
import { Router } from "express";
import ordersService from "./orders.service";
import ordersValidation from "./orders.validation";
import authService from "../auth/auth.service";

const paymentRouter: Router = Router();

paymentRouter.post('/', ordersService.createOnlinePayment);

export default paymentRouter;

