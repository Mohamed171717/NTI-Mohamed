
import { Router } from "express";
import cartsService from "./carts.service";
import cartsValidation from "./carts.validation";

const cartsRouter: Router = Router();


cartsRouter.route('/')
.get(cartsService.getCart)
.post(cartsValidation.checkProduct, cartsService.addToCart)
.delete(cartsService.clearCart)

cartsRouter.route('/:itemId')
.put(cartsValidation.checkProduct, cartsService.updateQuantity)
.delete( cartsValidation.removeOne, cartsService.removeFromCart)

cartsRouter.put('/apply-coupon', cartsService.applyCoupon)

export default cartsRouter;

