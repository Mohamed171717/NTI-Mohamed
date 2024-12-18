
import { Router, Request, Response , NextFunction } from "express";
import ProductsService from "./products.service";
import ProductsValidation from "./products.validation";
import authService from "../auth/auth.service";
import reviewsRouter from "../reviews/reviews.route";


const productsRouter: Router = Router();

productsRouter.use('/:productId/reviews', reviewsRouter)

productsRouter.route('/')
.get( ProductsService.getAllProducts )
.post(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), ProductsService.uploadImages, ProductsService.saveImg, ProductsValidation.createOne, ProductsService.createProducts )

productsRouter.route('/:id')
.get( ProductsValidation.getOne, ProductsService.getProducts )
.put(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), ProductsService.uploadImages, ProductsService.saveImg, ProductsValidation.updateOne, ProductsService.updateProducts )
.delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee"), ProductsValidation.deleteOne, ProductsService.deleteProducts )


export default productsRouter;