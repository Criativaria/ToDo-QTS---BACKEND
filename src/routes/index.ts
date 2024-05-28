import { Router } from "express";
import { userRoute } from "./user-routes"
import { taskRoute } from "./task-routes";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const appRoutes = Router();

appRoutes.use("/user", userRoute)
appRoutes.use("/task", AuthMiddleware, taskRoute)

export { appRoutes }