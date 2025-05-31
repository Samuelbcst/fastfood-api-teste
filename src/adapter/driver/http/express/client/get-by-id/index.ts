import { Request } from "express"
import { makeGetClientByIdFactory } from "./make-client-get-by-id-dependencies"

export const getClientById = async (params: Request["params"]) => {
    const id = Number(params.id)
    if (isNaN(id)) throw new Error("Id must be a number")
    const useCase = await makeGetClientByIdFactory()
    const result = await useCase.execute({ id })
    await useCase.onFinish()

    return result
}
