
import express from 'express';
import categoriesRouter from './categories/categories.route';
import subcategoriesRouter from './subcategories/subcategories.route';
import productsRouter from './products/products.route';
import globalErrors from './middlewares/error.middleware';
import ApiErrors from './utilities/apiErrors';
import usersRouter from './users/users.route';


declare module "express" {
    interface Request {
        filterData?: any;
        files?: any;
    }
}

const mountRoutes = ( app: express.Application) => {
    app.use('/api/v1/categories', categoriesRouter );
    app.use('/api/v1/subcategories', subcategoriesRouter );
    app.use('/api/v1/products', productsRouter );
    app.use('/api/v1/users', usersRouter );
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next( new ApiErrors( `The Route ${req.originalUrl} Not Found`, 400 ))
    })
    app.use(globalErrors)
}

export default mountRoutes;