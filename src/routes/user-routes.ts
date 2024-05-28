import { Router } from "express";
import { UserControler } from "../controllers/user-controllers";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const userRoute = Router();

userRoute.post('/', UserControler.createUser)
userRoute.get('/:id', UserControler.getUser)
userRoute.post('/login', UserControler.login)
userRoute.get('/', AuthMiddleware, UserControler.getAuthUser)
export { userRoute }