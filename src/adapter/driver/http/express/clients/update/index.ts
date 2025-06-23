import { Request } from "express"
import { makeUpdateClientFactory } from "./make-client-update-dependencies"
import { CustomError } from "../../../../../../core/application/use-case/custom-error"
import { z } from "zod"

export const updateClient = async (params: Request["params"], body: Request["body"]) => {
    const id = Number(params.id)
    if (isNaN(id)) throw new Error("Id must be a number")
    try {
        const { name, email, cpf } = z
            .object({
                name: z.string().min(1, "Name is required"),
                email: z.string().email("Valid email is required").optional(),
                cpf: z.string().min(1, "CPF is required").optional(),
            })
            .parse(body)

        const useCase = await makeUpdateClientFactory()
        const result = await useCase.execute({ id, name, email, cpf })
        await useCase.onFinish()
        return result
    } catch (error) {
        if (error instanceof z.ZodError) {
            const { CustomError } = await import("../../../../../../core/application/use-case/custom-error")
            const customError = new CustomError(400, "Validation error") as CustomError & { details?: unknown }
            customError.details = error.errors
            return {
                success: false,
                result: null,
                error: customError,
            }
        }
        throw error
    }
}
