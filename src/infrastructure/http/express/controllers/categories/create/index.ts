import { Request } from "express"
import { makeCreateCategoryFactory } from "./make-category-create-dependencies"
import { z } from "zod"

export const createCategory = async ({},body: Request["body"]) => {
    const { name, description } = z
        .object({
            name: z.string().min(1, "Name is required"),
            description: z.string().optional(),
        })
        .parse(body)

    const useCase = await makeCreateCategoryFactory()
    const result = await useCase.execute({ name, description })
    await useCase.onFinish()
    return result
}
