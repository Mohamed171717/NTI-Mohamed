import { Request, Response , NextFunction } from "express";
import { Orders } from "./orders.interface";
import ordersSchema from "./orders.schema";
import refactorService from "../refactor.service";
import asyncHandler from "express-async-handler";
import cartsSchema from "../carts/carts.schema";
import ApiErrors from "../utilities/apiErrors";
import productsSchema from "../products/products.schema";
import JWT  from "jsonwebtoken";
import usersSchema from "../users/users.schema";


class OrdersService {

    filterOrders(req: Request, res: Response, next: NextFunction) {
        const filterData: any = {};
        if (req.user.role === 'user') filterData.user = req.user._id;
        req.filterData = filterData;
        next();
    };

    getAllOrders = refactorService.getAll<Orders>(ordersSchema);

    getOrders = refactorService.getOne<Orders>(ordersSchema);

    createCashOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const cart = await cartsSchema.findOne({user: req.user._id});
        if (!cart) return next(new ApiErrors(`${req.__('cart_not_found')}`, 404));
        const itemsPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
        const order = await ordersSchema.create({
            items: cart.items,
            taxPrice: cart.taxPrice,
            itemsPrice: itemsPrice,
            totalPrice: cart.taxPrice + itemsPrice,
            user: req.user._id,
            address: req.body.address
        });
        const bulkOptions = cart.items.map((item) => ({
            updateOne: {
                filter: {_id: item.product._id},
                update: {$inc: {quantity: -item.quantity, sold: item.quantity}}
            }
        }));
        await productsSchema.bulkWrite(bulkOptions);
        await cartsSchema.deleteOne({user: req.user._id});
        res.status(201).json({data: order});
    });

    createOnlinePayment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = req.body.obj.payment_key_claims.extra.token;
        const decoded: any = JWT.decode(token);
        const user = await usersSchema.findById(decoded._id);

        const cart: any = await cartsSchema.findOne({user: user?._id});
        const itemsPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
        const order = await ordersSchema.create({
            items: cart.items,
            taxPrice: cart.taxPrice,
            itemsPrice: itemsPrice,
            totalPrice: cart.taxPrice + itemsPrice,
            user: user?._id,
            address: req.body.obj.payment_key_claims.extra.address,
            isPaid: true,
            paidAt: Date.now()
        });
        const bulkOptions = cart.items.map((item: any) => ({
            updateOne: {
                filter: {_id: item.product._id},
                update: {$inc: {quantity: -item.quantity, sold: item.quantity}}
            }
        }));
        await productsSchema.bulkWrite(bulkOptions);
        await cartsSchema.deleteOne({user: user?._id});
        res.status(201).json({data: order});
    });

    payOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const order = await ordersSchema.findByIdAndUpdate(req.params.id, {
            isPaid: true,
            paidAt: Date.now()
        }, {new: true});
        res.status(200).json({success: true});
    });

    deliverOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const order = await ordersSchema.findByIdAndUpdate(req.params.id, {
            isDelivered: true,
            deliveredAt: Date.now()
        }, {new: true});
        res.status(200).json({success: true});
    });



}

const ordersService = new OrdersService();
export default ordersService;
// or you can use export default new CategoriesService;