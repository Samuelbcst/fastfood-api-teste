import { makeDeleteClientUseCase } from "../../../../../../application/use-cases/client/delete-client/make-delete-client-use-case"
import { makeDeleteClientRepository } from "../../../../../../infrastructure/database/typeorm/client/delete-client-repository/make-delete-client-repository"

export const makeDeleteClientFactory = async () => {
    const deleteClientRepository = await makeDeleteClientRepository()
    const useCase = makeDeleteClientUseCase(deleteClientRepository)
    return useCase
}
