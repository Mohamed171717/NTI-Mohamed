
import express from 'express';
import categoriesRouter from './categories/categories.route';
import subcategoriesRouter from './subcategories/subcategories.route';
import productsRouter from './products/products.route';
import globalErrors from './middlewares/error.middleware';
import ApiErrors from './utilities/apiErrors';
import usersRouter from './users/users.route';
import authRouter from './auth/auth.route';
import profileRouter from './profile/profiles.route';
// import googleRouter from './google/google.route';
import wishlistRouter from './wishlist/wishlist.route';
import addressRouter from './address/address.route';
import reviewsRouter from './reviews/reviews.route';
import couponsRouter from './coupons/coupons.route';
import cartsRouter from './carts/carts.route';
import csurf from 'csurf';
import ordersRouter from './orders/orders.route';
import verifyPaymob from './middlewares/verifypaymob';
import paymentRouter from './orders/payment.route';


declare module "express" {
    interface Request {
        filterData?: any;
        user?: any;
        files?: any;
    }
}

const mountRoutes = ( app: express.Application) => {
    app.post('/paymob-webhook', verifyPaymob, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.obj.success === true) {
            // res.redirect(307, `/api/v1/${req.body.obj.payment_key_claims.extra.routeName}`);
            res.redirect(307, `/api/v1/payment`);
        } else {
            return next(new ApiErrors('invalid payment', 403));
        }
    });
    // app.use('/auth/google', googleRouter );
    app.use('/api/v1/payment', paymentRouter);
    app.use(csurf({
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: 'strict' // recommended
        }
    }));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.cookie( 'cookie', req.csrfToken())
        next();
    });
    app.use('/api/v1/categories', categoriesRouter );
    app.use('/api/v1/subcategories', subcategoriesRouter );
    app.use('/api/v1/products', productsRouter );
    app.use('/api/v1/users', usersRouter );
    app.use('/api/v1/auth', authRouter );
    app.use('/api/v1/profile', profileRouter );
    app.use('/api/v1/wishlist', wishlistRouter );
    app.use('/api/v1/address', addressRouter );
    app.use('/api/v1/reviews', reviewsRouter );
    app.use('/api/v1/coupons', couponsRouter );
    app.use('/api/v1/carts', cartsRouter );
    app.use('/api/v1/orders', ordersRouter );
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next( new ApiErrors( `The Route ${req.originalUrl} Not Found`, 400 ))
    })
    app.use(globalErrors)
}

export default mountRoutes;