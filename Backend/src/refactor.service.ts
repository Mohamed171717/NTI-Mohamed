
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utilities/apiErrors";
import Features from "./utilities/features";
import sanitization from "./utilities/sanitization";


class RefactorService {

    getAll = <modelType>(model: mongoose.Model<modelType>, modelName?: string ) =>   asyncHandler( 
        async ( req: Request, res: Response, next: NextFunction ) => {
            let filterData: any = {};
            if( req.filterData ) filterData = req.filterData;

            let documentCounts = await model.find(filterData).countDocuments();
            let features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName!);   
            
            const documents: modelType[] = await features.mongooseQuery;
            if (req.query) {
                documentCounts = documents.length;
            }

            features.pagination(documentCounts);
            
            res.status(200).json({ pagination: features.paginationResults, length: documents.length, data: documents });
        }
    )
    createOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType = await model.create(req.body);
            res.status(201).json({ data: document})
        }
    )
    getOne = <modelType>(model: mongoose.Model<any>, modelName?: string, populationOptions?: string ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            let query: any = await model.findById(req.params.id);
            if(populationOptions) query = query.populate(populationOptions);
            let document: any = await query;
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            if(modelName == "users") document = sanitization.User(document);
            res.status(200).json({ data: document })
        }
    )

    updateOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            res.status(200).json({ data: document})
        }
    )

    deleteOne = <modelType>(model: mongoose.Model<any> ) => asyncHandler( 
        async  ( req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findOneAndDelete({_id: req.params.id});
            if(!document) return next(new ApiErrors( `${req.__('not_found')}`, 404 ));
            res.status(204).json()
        }
    )

}

const refactorService = new RefactorService();
export default refactorService;
// or you can use export default new refactorService;