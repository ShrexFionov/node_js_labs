import { Router } from "express";
import UserController from "../controllers/UserController.js";
import CategoryController from "../controllers/CategoryController";
import ReviewsController from "../controllers/ReviewsController.js";
import OrderController from "../controllers/OrderController.js";
import OrderItemsController from "../controllers/OrderItemsController.js";
import ProductController from "../controllers/ProductController.js";
import { authMiddleware } from "../authMiddleware.js";


const userRouter = new Router()
userRouter.post('/registration', UserController.registration)
userRouter.get('/activate/:link', UserController.activate)
userRouter.post('/login', UserController.login)
userRouter.get('/users', UserController.get_all)
userRouter.get('/users/:id',authMiddleware, UserController.get)
userRouter.post('/users', UserController.create)
userRouter.put('/users/:id',authMiddleware, UserController.update)
userRouter.delete('/users/:id',authMiddleware, UserController.delete)

const categoryRouter = new Router()
categoryRouter.get('/category', CategoryController.get_all)
categoryRouter.get('/category/:id', CategoryController.get)
categoryRouter.post('/category', CategoryController.create)
categoryRouter.put('/category/:id', CategoryController.update)
categoryRouter.delete('/category/:id', CategoryController.delete)

const reviewsRouter = new Router()
reviewsRouter.get('/reviews', ReviewsController.get_all)
reviewsRouter.get('/reviews/:id', ReviewsController.get)
reviewsRouter.post('/reviews', ReviewsController.create)
reviewsRouter.put('/reviews/:id', ReviewsController.update)
reviewsRouter.delete('/reviews/:id', ReviewsController.delete)

const orderRouter = new Router()
orderRouter.get('/order', OrderController.get_all)
orderRouter.get('/order/:id', OrderController.get)
orderRouter.post('/order', OrderController.create)
orderRouter.put('/order/:id', OrderController.update)
orderRouter.delete('/order/:id', OrderController.delete)

const orderItemsRouter = new Router()
orderItemsRouter.get('/order_items', OrderItemsController.get_all)
orderItemsRouter.get('/order_items/:id', OrderItemsController.get)
orderItemsRouter.post('/order_items', OrderItemsController.create)
orderItemsRouter.put('/order_items/:id', OrderItemsController.update)
orderItemsRouter.delete('/order_items/:id', OrderItemsController.delete)

const productRouter = new Router()
productRouter.get('/product', ProductController.get_all)
productRouter.get('/product/:id', ProductController.get)
productRouter.post('/product', ProductController.create)
productRouter.put('/product/:id', ProductController.update)
productRouter.delete('/product/:id', ProductController.delete)

export {userRouter, categoryRouter, reviewsRouter, orderRouter, orderItemsRouter, productRouter}