import { makeUpdateClientUseCase } from "../../../../../../core/application/use-case/client/update-client/make-update-client-use-case"
import { makeUpdateClientRepository } from "../../../../../driven/persistence/typeorm/client/update-client-repository/make-update-client-repository"

export const makeUpdateClientFactory = async () => {
    const updateClientRepository = await makeUpdateClientRepository()
    const useCase = makeUpdateClientUseCase(updateClientRepository)
    return useCase
}
