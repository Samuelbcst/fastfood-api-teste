import { runEndpoint } from "../run-endpoint"
import { getClientAll } from "./get-all"
import { getClientById } from "./get-by-id"
import { Router } from "express"

const clientRouter = Router()

clientRouter.get("/client", runEndpoint(getClientAll, 200))
clientRouter.get("/client/:id", runEndpoint(getClientById, 200))

export default clientRouter
