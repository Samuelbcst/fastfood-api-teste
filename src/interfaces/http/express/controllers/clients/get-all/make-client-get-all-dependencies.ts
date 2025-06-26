import { makeFindClientAllUseCase } from "../../../../../../application/use-cases/client/find-client-all/make-find-client-all-use-case"
import { makeFindClientAllRepository } from "../../../../../../infrastructure/database/typeorm/client/find-client-all-repository/make-find-client-all-repository"

export const makeGetClientAllFactory = async () => {
    const repository = await makeFindClientAllRepository()
    const useCase = makeFindClientAllUseCase(repository)
    return useCase
}
