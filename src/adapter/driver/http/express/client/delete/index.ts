import { Request } from "express"
import { makeDeleteClientFactory } from "./make-client-delete-dependencies"

export const deleteClient = async (params: Request["params"]) => {
    const id = Number(params.id)
    if (isNaN(id)) throw new Error("Id must be a number")

    const useCase = await makeDeleteClientFactory()
    const result = await useCase.execute({ id })
    await useCase.onFinish()

    return result
}
