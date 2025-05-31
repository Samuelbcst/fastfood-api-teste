import { makeGetClientAllFactory } from "./make-client-get-all-dependencies"

export const getClientAll = async () => {
    const useCase = await makeGetClientAllFactory()
    const result = await useCase.execute()
    await useCase.onFinish()
    return result
}
