import { Request, Response , NextFunction } from "express";
import { Reviews } from "./reviews.interface";
import reviewsSchema from "./reviews.schema";
import refactorService from "../refactor.service";


class ReviewsService {

    setId ( req: Request, res: Response, next: NextFunction ) {
        req.body.user = req.user._id;
        req.body.product = req.params.productId;
        next();
    }
    filterReviews ( req: Request, res: Response, next: NextFunction ) {
        const filterDate: any = {};
        if (req.params.productId) filterDate.product = req.params.productId;
        if (!req.params.productId && req.user && req.user.role == "user" ) filterDate.user = req.user._id;
        req.filterData = filterDate;
        next();
    }

    getAllReviews = refactorService.getAll<Reviews>(reviewsSchema);

    createReviews = refactorService.createOne<Reviews>(reviewsSchema);

    getReviews = refactorService.getOne<Reviews>(reviewsSchema);

    updateReviews = refactorService.updateOne<Reviews>(reviewsSchema);

    deleteReviews = refactorService.deleteOne<Reviews>(reviewsSchema);

}

const reviewsService = new ReviewsService();
export default reviewsService;
// or you can use export default new CategoriesService;