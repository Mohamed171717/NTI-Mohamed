
import { Router } from "express";
import usersService from "./users.service";
import usersValidation from "./users.validation";
import authService from "../auth/auth.service";

const usersRouter: Router = Router();

usersRouter.use( authService.protectedRoutes, authService.checkActive);
usersRouter.use( authService.allowedTo("admin"));

usersRouter.route('/')
.get(usersService.getAllUsers)
.post(usersService.uploadImage, usersService.saveImage ,usersValidation.createOne, usersService.createUsers);

usersRouter.route('/:id')
.get(usersValidation.getOne, usersService.getUsers)
.put(usersService.uploadImage, usersService.saveImage ,usersValidation.updateOne, usersService.updateUsers)
.delete(usersValidation.deleteOne, usersService.deleteUsers);

usersRouter.put('/:id/change-password', usersValidation.changePassword, usersService.changePassword);


export default usersRouter;

