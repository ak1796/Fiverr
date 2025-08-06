import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getClientOrders, getFreelancerOrder, markOrderAsCompleted, markOrderAsfailed, placeOrders } from "../controllers/order.controllers.js";


const orderRouter = express.Router();

orderRouter.post('/place-order',authUser,placeOrders)
orderRouter.get('/client-order',authUser,getClientOrders)
orderRouter.get('/freelancer-order',authUser,getFreelancerOrder)

orderRouter.post('/mark-completed',authUser,markOrderAsCompleted)
orderRouter.post('/mark-failed',authUser,markOrderAsfailed)


export default orderRouter;
