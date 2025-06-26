import { Request } from "express"
import { makeGetClientByCpfFactory } from "./make-client-get-by-cpf-dependencies"

export const getClientByCpf = async (params: Request["params"]) => {
    const { cpf } = params
    if (!cpf) throw new Error("CPF is required")
    const useCase = await makeGetClientByCpfFactory()
    const result = await useCase.execute({ cpf })
    await useCase.onFinish()
    return result
}
