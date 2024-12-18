
import { Router } from "express";
import addressService from "./address.service";
import authService from "../auth/auth.service";

const addressRouter: Router = Router();

addressRouter.use( authService.protectedRoutes, authService.checkActive);

addressRouter.route('/')
.get( addressService.getAddress )
.post( addressService.addAddress )

addressRouter.delete('/:productId', addressService.removeAddress)

export default addressRouter;

