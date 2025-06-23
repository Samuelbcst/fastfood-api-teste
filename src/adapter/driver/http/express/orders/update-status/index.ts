import { Request } from "express"
import { makeUpdateOrderStatusFactory } from './make-order-update-status-dependencies'
import { z } from "zod"
import { OrderStatus } from '../../../../../../core/domain/order/order'

export const updateOrderStatus = async (params: Request["params"], body: Request["body"]) => {
    const id = Number(params.id)
    if (isNaN(id)) throw new Error("Id must be a number")

    const { status } = z.object({ status: z.nativeEnum(OrderStatus) }).parse(body)
    const useCase = await makeUpdateOrderStatusFactory()
    const result = await useCase.execute({ id, status })
    await useCase.onFinish()
    return result
}
