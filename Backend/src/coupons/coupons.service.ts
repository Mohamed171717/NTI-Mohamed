import { Request, Response , NextFunction } from "express";
import { Coupons } from "./coupons.interface";
import couponsSchema from "./coupons.schema";
import refactorService from "../refactor.service";


class CouponsService {

    getAllCoupons = refactorService.getAll<Coupons>(couponsSchema);

    createCoupons = refactorService.createOne<Coupons>(couponsSchema);

    getCoupons = refactorService.getOne<Coupons>(couponsSchema);

    updateCoupons = refactorService.updateOne<Coupons>(couponsSchema);

    deleteCoupons = refactorService.deleteOne<Coupons>(couponsSchema);

}

const couponsService = new CouponsService();
export default couponsService;
// or you can use export default new CategoriesService;