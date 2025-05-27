import { Router } from "express"
import categoryRouter from "./category"

const routes = Router()

routes.use("/v1", categoryRouter)

export default routes
