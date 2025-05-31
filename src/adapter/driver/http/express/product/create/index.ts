import { Request } from "express"
import { makeCreateProductFactory } from "./make-product-create-dependencies"
import { z } from "zod"

export const createProduct = async ({}, body: Request["body"]) => {
    const { name, description, price, categoryId, active } = z
        .object({
            name: z.string().min(1, "Name is required"),
            description: z.string().optional(),
            price: z.number().positive(),
            categoryId: z.number().int().positive(),
            active: z.boolean().optional(),
        })
        .parse(body)

    const useCase = await makeCreateProductFactory()
    const result = await useCase.execute({ name, description, price, categoryId, active })
    await useCase.onFinish()
    return result
}
