import { Router } from "express"
import categoryRouter from "./category"
import productRouter from "./product"
import clientRouter from "./client"
import orderRouter from "./order"
import orderItemRouter from "./order-item"
import paymentRouter from "./payment"

const routes = Router()

routes.use("/v1", categoryRouter)
routes.use("/v1", productRouter)
routes.use("/v1", clientRouter)
routes.use("/v1", orderRouter)
routes.use("/v1", orderItemRouter)
routes.use("/v1", paymentRouter)

export default routes
