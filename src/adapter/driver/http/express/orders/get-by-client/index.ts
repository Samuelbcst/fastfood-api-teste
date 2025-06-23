import { Request } from "express"
import { makeGetOrderByClientFactory } from "./make-order-get-by-client-dependencies"

export const getOrderByClient = async (params: Request["params"]) => {
    const clientId = Number(params.clientId)
    if (isNaN(clientId)) throw new Error("clientId must be a number")
    const useCase = await makeGetOrderByClientFactory()
    const result = await useCase.execute({ clientId })
    await useCase.onFinish()
    return result
}
