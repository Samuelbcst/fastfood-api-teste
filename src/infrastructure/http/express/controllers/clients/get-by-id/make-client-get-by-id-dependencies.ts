import { makeFindClientByIdUseCase } from "../../../../../../application/use-cases/client/find-client-by-id/make-find-client-by-id-use-case"
import { makeFindClientByIdRepository } from "../../../../../../infrastructure/database/typeorm/client/find-client-by-id-repository/make-find-client-by-id-repository"

export const makeGetClientByIdFactory = async () => {
    const repository = await makeFindClientByIdRepository()
    const useCase = makeFindClientByIdUseCase(repository)
    return useCase
}
