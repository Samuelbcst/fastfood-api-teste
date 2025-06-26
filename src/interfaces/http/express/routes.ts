import { Router } from "express"
import categoryRouter from "../../../../interfaces/http/express/controllers/categories"
import productRouter from "./controllers/products"
import clientRouter from "./controllers/clients"
import orderRouter from "./controllers/orders"
import orderItemRouter from "./controllers/order-items"
import paymentRouter from "./controllers/payments"

const routes = Router()

routes.use("/v1/categories", categoryRouter)
routes.use("/v1/products", productRouter)
routes.use("/v1/clients", clientRouter)
routes.use("/v1/orders", orderRouter)
routes.use("/v1/order-items", orderItemRouter)
routes.use("/v1/payments", paymentRouter)

export default routes
