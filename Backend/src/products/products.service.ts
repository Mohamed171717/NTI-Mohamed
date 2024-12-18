
import { Request, Response , NextFunction } from "express";
import { Products } from "./products.interface";
import productsSchema from "./products.schema";
import refactorService from "../refactor.service";
import sharp from 'sharp';
import { uploadMultiFiles, uploadSingleFile } from "../middlewares/uploadFiles.middleware";



class ProductsService {

    getAllProducts = refactorService.getAll<Products>(productsSchema, 'products');

    createProducts = refactorService.createOne<Products>(productsSchema);

    getProducts = refactorService.getOne<Products>(productsSchema, 'products', 'reviews');

    updateProducts = refactorService.updateOne<Products>(productsSchema);

    deleteProducts = refactorService.deleteOne<Products>(productsSchema);

    uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 5}]);
    // uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 5}])
            // upload by memory storage    take a buffer to update or edit
    saveImg = async (req: Request, res: Response, next: NextFunction) => {
        if (req.files.cover) {
            const fileName: string = `product-${Date.now()}-cover.webp`;
            await sharp(req.files.cover[0].buffer)
                .resize(500, 350)
                .webp({quality: 95}) 
                .toFile(`uploads/images/products/${fileName}`)
            req.body.cover = fileName;
        }
        if (req.files.images) {
            req.body.images = [];
            await Promise.all(
                req.files.images.map( async ( image: any, index: number) => {
                    const fileName: string = `product-${Date.now()}-image-${index + 1}.webp`;
                    await sharp(image.buffer)
                    .resize(500, 350)
                    .webp({quality: 95}) 
                    .toFile(`uploads/images/products/${fileName}`)
                    req.body.images.push(fileName);
                })
            );
        }
        next();
    }

}

const productsService = new ProductsService();
export default productsService;











// for upload file
// saveImg = async (req: Request, res: Response, next: NextFunction) => {
//     if (req.file) {
//         const fileName: string = `product-${Date.now()}-cover.webp`;
//         await sharp(req.file.buffer)
//             .resize(500, 350)
//             .webp({quality: 95}) 
//             .toFile(`uploads/images/products/${fileName}`)
//         req.body.cover = fileName;
//     }
//     next();
// }