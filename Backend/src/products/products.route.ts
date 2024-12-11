
import { Router, Request, Response , NextFunction } from "express";
import ProductsService from "./products.service";
import ProductsValidation from "./products.validation";


const productsRouter: Router = Router();

productsRouter.route('/')
.get( ProductsService.getAllProducts )
.post( ProductsService.uploadImages, ProductsService.saveImg, ProductsValidation.createOne, ProductsService.createProducts )

productsRouter.route('/:id')
.get( ProductsValidation.getOne, ProductsService.getProducts )
.put( ProductsService.uploadImages, ProductsService.saveImg, ProductsValidation.updateOne, ProductsService.updateProducts )
.delete( ProductsValidation.deleteOne, ProductsService.deleteProducts )


export default productsRouter;