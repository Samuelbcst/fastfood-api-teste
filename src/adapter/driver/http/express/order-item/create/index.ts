import { Request } from "express"
import { makeCreateOrderItemFactory } from "./make-order-item-create-dependencies"
import { makeGetProductByIdFactory } from "../../product/get-by-id/make-product-get-by-id-dependencies"
import { z } from "zod"

export const createOrderItem = async ({}, body: Request["body"]) => {
    const { orderId, productId, quantity } = z
        .object({
            orderId: z.number().int().positive(),
            productId: z.number().int().positive(),
            quantity: z.number().int().positive()
        })
        .parse(body)

    const productUseCase = await makeGetProductByIdFactory()
    const productResult = await productUseCase.execute({ id: productId })
    await productUseCase.onFinish()
    if (!productResult.success || !productResult.result) {
        throw new Error("Product not found")
    }

    const { name: productName, price: unitPrice } = productResult.result
    const useCase = await makeCreateOrderItemFactory()
    const result = await useCase.execute({
        orderId,
        productId,
        quantity,
        productName,
        unitPrice
    })
    await useCase.onFinish()
    return result
}
