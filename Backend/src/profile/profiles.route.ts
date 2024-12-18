
import { Router } from "express";
import profileService from "./profiles.service";
import profileValidation from "./profiles.validation";
import authService from "../auth/auth.service";

const profileRouter: Router = Router();

profileRouter.use( authService.protectedRoutes, authService.checkActive);
profileRouter.use( authService.allowedTo("admin"));

profileRouter.route('/')
.get(profileService.setUserId, profileService.getProfile)
.put(profileService.uploadImage, profileService.saveImage ,profileValidation.updateOne, profileService.updateProfile)
.delete(authService.allowedTo("user"), profileValidation.deleteOne, profileService.deleteProfile);

profileRouter.put('/:id/create-password', profileValidation.createPassword, profileService.createPassword);
profileRouter.put('/:id/change-password', profileValidation.changePassword, profileService.changePassword);


export default profileRouter;

