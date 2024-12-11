
import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utilities/apiErrors";
import Features from "./utilities/features";


class RefactorService {

    getAll = <modelType>(model: mongoose.Model<any>, modelName?: string ) =>   asyncHandler( 
        async ( req: Request, res: Response, next: NextFunction ) => {
            let filterData: any = {};
            if( req.filterData ) filterData = req.filterData;
            const documentCount = await model.find(filterData).countDocuments();
            const features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName!).pagination(documentCount);
            const documents: modelType[] = await features.mongooseQuery;
            res.status(200).json({ pagination: features.paginationResults, length: documents.length, data: documents });
        }
    )

    createOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType = await model.create(req.body);
            res.status(201).json({ data: document})
        }
    )

    getOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findById(req.params.id);
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            res.status(200).json({ data: document })
        }
    )

    updateOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            res.status(200).json({ data: document})
        }
    )

    deleteOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findByIdAndDelete(req.params.id);
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            res.status(204).json()
        }
    )

}

const refactorService = new RefactorService();
export default refactorService;
// or you can use export default new refactorService;