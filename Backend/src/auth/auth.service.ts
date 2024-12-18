import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utilities/apiErrors";
import createTokens from "../utilities/tokens";
import sanitization from "../utilities/sanitization";
import sendMail from "../utilities/sendMail";

class AuthService {
    signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        });
        const token = createTokens.accessToken(user._id, user.role);
        res.status(201).json({token, data: sanitization.User(user)});
    });
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({$or: [{username: req.body.username}, {email: req.body.username}]});
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 401));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });
    adminLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({
            $or: [{username: req.body.username}, {email: req.body.username}],
            role: {$in: ['admin', 'employee']}
        });
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 401)); 
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });
    forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({email: req.body.email})
        if (!user) return next(new ApiErrors(`${req.__('check_email')}`, 404));
        const resetCode: string = Math.floor( 100000 + Math.random() * 900000).toString();
        const cryptedCode: string = crypto.createHash('sha256').update(resetCode).digest('hex');
        const message = `your reset code is ${resetCode}`
        const options = {
            message,
            subject: 'Reset Password',
            email: user.email
        }
        try {
            await sendMail(options)
            user.passwordResetCode = cryptedCode;
            user.passwordResetCodeExpires = Date.now() + (10 * 60 * 1000);
            user.passwordResetCodeVerfiy = false;
            if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
            await user.save({validateModifiedOnly: true});
        }
        catch (err) {
            return next (new ApiErrors(`${req.__('invalid_login')}`, 500));
        }
        const token = createTokens.resetToken(user._id);
        res.status(200).json({token, success: true});
    })
    protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_login')}`, 401));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await usersSchema.findById(decoded._id); 
        if (!user) return next(new ApiErrors(`${req.__('user_not_found')}`, 404));

        if (user.passwordChangedAt instanceof Date) {
            const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
            if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
        }

        req.user = user;
        next();
    })
    resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_reset_code')}`, 403));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user: any = await usersSchema.findOne({
            id: decoded._id, 
            passwordResetCodeVerfiy: true, 
        });
        if (!user) return next(new ApiErrors(`${req.__('check_code_verify')}`, 403));

        user.password = req.body.password;
        user.passwordResetCodeVerfiy = undefined;
        user.passwordResetCode = undefined;
        user.passwordResetCodeExpires = undefined;
        user.passwordChangedAt = Date.now();
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
            await user.save({validateModifiedOnly: true});
        res.status(200).json({success: true});
    });
    verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_verify_code')}`, 403));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
        const user = await usersSchema.findOne({
            id: decoded._id, 
            passwordResetCode: hashedResetCode, 
            passwordResetCodeExpires: {$gt: Date.now()}}); 
        if (!user) return next(new ApiErrors(`${req.__('check_code_valid')}`, 403));
        user.passwordResetCodeVerfiy = true;
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
            await user.save({validateModifiedOnly: true});
        res.status(200).json({success: true});
    });
    allowedTo = (...roles: string[]) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.user?.role!)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403)); 
            next();
        })
    checkActive = asyncHandler((req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })
}

const authService = new AuthService();
export default authService;