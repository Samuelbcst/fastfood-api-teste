import { makeCreateClientUseCase } from "../../../../../../core/application/use-case/client/create-client/make-create-client-use-case"
import { makeCreateClientRepository } from "../../../../../driven/persistence/typeorm/client/create-client-repository/make-create-client-repository"

export const makeCreateClientFactory = async () => {
    const repository = await makeCreateClientRepository()
    const useCase = makeCreateClientUseCase(repository)
    return useCase
}
