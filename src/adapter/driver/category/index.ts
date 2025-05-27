import { runEndpoint } from "../run-endpoint"
import { getCategoryAll } from "./get-all"
import { getCategoryById } from "./get-by-id"
import { Router } from "express"

const categoryRouter = Router()

categoryRouter.get("/category", runEndpoint(getCategoryAll, 200))
categoryRouter.get("/category/:id", runEndpoint(getCategoryById, 200))

export default categoryRouter
