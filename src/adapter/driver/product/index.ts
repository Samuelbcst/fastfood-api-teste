import { runEndpoint } from "../run-endpoint"
import { getProductAll } from "./get-all"
import { getProductById } from "./get-by-id"
import { Router } from "express"

const productRouter = Router()

productRouter.get("/product", runEndpoint(getProductAll, 200))
productRouter.get("/product/:id", runEndpoint(getProductById, 200))

export default productRouter
