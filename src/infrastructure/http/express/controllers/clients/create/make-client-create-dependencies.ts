import { makeCreateClientUseCase } from "../../../../../../application/use-cases/client/create-client/make-create-client-use-case"
import { makeCreateClientRepository } from "../../../../../../infrastructure/database/typeorm/client/create-client-repository/make-create-client-repository"

export const makeCreateClientFactory = async () => {
    const repository = await makeCreateClientRepository()
    const useCase = makeCreateClientUseCase(repository)
    return useCase
}
