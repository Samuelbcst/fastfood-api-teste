import { Router } from "express"
import categoryRouter from "./category"
import productRouter from "./product"
import clientRouter from "./client"

const routes = Router()

routes.use("/v1", categoryRouter)
routes.use("/v1", productRouter)
routes.use("/v1", clientRouter)

export default routes
