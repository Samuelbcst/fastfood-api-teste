import { Request } from "express"
import { makeCreateClientFactory } from "./make-client-create-dependencies"
import { z, ZodError } from "zod"
import { CustomError } from "../../../../../../application/use-cases/custom-error"

export const createClient = async ({}, body: Request["body"]) => {
    try {
        const { name, email, cpf } = z
            .object({
                name: z.string().min(1, "Name is required"),
                email: z.string().email("Valid email is required"),
                cpf: z.string().min(1, "CPF is required"),
            })
            .parse(body)

        const useCase = await makeCreateClientFactory()
        const result = await useCase.execute({ name, email, cpf })
        await useCase.onFinish()
        return result
    } catch (error) {
        if (error instanceof ZodError) {
            const customError = new CustomError(400, "Validation error") as CustomError & { details?: unknown }
            customError.details = error.errors
            return {
                success: false,
                result: null,
                error: customError,
            }
        }
        const customError = new CustomError(500, (error as Error).message || "Unknown error")
        return {
            success: false,
            result: null,
            error: customError,
        }
    }
}
