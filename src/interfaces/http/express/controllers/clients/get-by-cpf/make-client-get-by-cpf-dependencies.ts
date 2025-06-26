import { FindClientByCpfUseCase } from "../../../../../../application/use-cases/client/find-client-by-cpf"
import { makeFindClientByCpfRepository } from "../../../../../../infrastructure/database/typeorm/client/find-client-by-cpf-repository/make-find-client-by-cpf-repository"

export const makeGetClientByCpfFactory = async () => {
    const repository = await makeFindClientByCpfRepository()
    const useCase = new FindClientByCpfUseCase(repository)
    return useCase
}
