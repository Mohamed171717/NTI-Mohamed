
import {Request} from "express";
import multer from "multer";
import ApiErrors from "../utilities/apiErrors";

        //  upload by disk storage
// const storage = multer.diskStorage ({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/images/products')
//     },
//     filename: function (req, file, cb) {
//         const extention = file.mimetype.split('/')[1];
//         const fileName: string = `product-${Date.now()}-cover.${extention}`;
//         cb(null, fileName);
//     }
// })

interface Fields {
    name: string;
    maxCount: number;
}

const uploadOptions = (fileTypes: string[]): multer.Multer => {
    const multerStorage: multer.StorageEngine = multer.memoryStorage();
    const multerFilter = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
        const isValidType: boolean = fileTypes.some((type) => file.mimetype.startsWith(type));
        if (isValidType) {
            cb(null, true);
        } else {
            cb(new ApiErrors('the file type is not allowed', 400))
        }

    };
    return multer({storage: multerStorage, fileFilter: multerFilter});
};

export const uploadSingleFile = (fileTypes: string[], fieldName: string) => uploadOptions(fileTypes).single(fieldName);
export const uploadMultiFiles = (fileTypes: string[], fields: Fields[]) => uploadOptions(fileTypes).fields(fields);