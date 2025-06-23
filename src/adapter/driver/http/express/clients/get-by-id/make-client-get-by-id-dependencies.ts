import { makeFindClientByIdUseCase } from "../../../../../../core/application/use-case/client/find-client-by-id/make-find-client-by-id-use-case"
import { makeFindClientByIdRepository } from "../../../../../driven/persistence/typeorm/client/find-client-by-id-repository/make-find-client-by-id-repository"

export const makeGetClientByIdFactory = async () => {
    const repository = await makeFindClientByIdRepository()
    const useCase = makeFindClientByIdUseCase(repository)
    return useCase
}
