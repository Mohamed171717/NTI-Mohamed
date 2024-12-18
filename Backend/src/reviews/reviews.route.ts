
import { Router } from "express";
import reviewsService from "./reviews.service";
import reviewsValidation from "./reviews.validation";
import authService from "../auth/auth.service";

const reviewsRouter: Router = Router({mergeParams: true});

// /api/v1/categories/:categoryid/subcategories

reviewsRouter.route('/')
.get(reviewsService.filterReviews, reviewsService.getAllReviews)
.post(authService.protectedRoutes, authService.checkActive, authService.allowedTo("user"), reviewsService.setId, reviewsValidation.createOne, reviewsService.createReviews)

reviewsRouter.get('/me', reviewsService.filterReviews, reviewsService.getAllReviews)

reviewsRouter.route('/:id')
.get(reviewsValidation.getOne, reviewsService.getReviews)
.put(authService.protectedRoutes, authService.checkActive, authService.allowedTo("user", "empolyee"), reviewsValidation.updateOne, reviewsService.updateReviews)
.delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo("admin", "empolyee", "user"), reviewsValidation.deleteOne, reviewsService.deleteReviews)


export default reviewsRouter;

