import { Request } from "express"
import { makeCreateOrderFactory } from "./make-order-create-dependencies"
import { makeGetProductByIdFactory } from "../../product/get-by-id/make-product-get-by-id-dependencies"
import { z } from "zod"
import { OrderStatus } from "../../../../../../core/domain/order"

export const createOrder = async ({}, body: Request["body"]) => {
    const { clientId, items } = z
        .object({
            clientId: z.number().int().positive(),
            items: z.array(
                z.object({
                    productId: z.number().int().positive(),
                    quantity: z.number().int().positive()
                })
            ),
        })
        .parse(body)

    const productUseCase = await makeGetProductByIdFactory()
    const now = new Date()
    const mappedItems = []
    for (const item of items) {
        const productResult = await productUseCase.execute({ id: item.productId })
        if (!productResult.success || !productResult.result) {
            await productUseCase.onFinish()
            throw new Error(`Product not found: ${item.productId}`)
        }
        const { name: productName, price: unitPrice } = productResult.result
        mappedItems.push({
            ...item,
            productName,
            unitPrice,
            orderId: 0,
            id: 0,
            createdAt: now,
            updatedAt: now,
        })
    }
    await productUseCase.onFinish()

    const useCase = await makeCreateOrderFactory()
    const result = await useCase.execute({
        clientId: clientId,
        items: mappedItems,
        status: OrderStatus.RECEIVED,
        statusUpdatedAt: now,
        totalAmount: mappedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    })
    await useCase.onFinish()
    return result
}
