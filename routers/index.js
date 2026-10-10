import { Router } from "express";
import { userRouter, categoryRouter, reviewsRouter, orderRouter, orderItemsRouter, productRouter } from "./userRouter.js";

const router = new Router()
router.use(userRouter, categoryRouter, reviewsRouter, orderRouter, orderItemsRouter, productRouter)

export { router }