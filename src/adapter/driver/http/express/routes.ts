import { Router } from "express"
import categoryRouter from "./category"
import productRouter from "./product"

const routes = Router()

routes.use("/v1", categoryRouter)
routes.use("/v1", productRouter)

export default routes
