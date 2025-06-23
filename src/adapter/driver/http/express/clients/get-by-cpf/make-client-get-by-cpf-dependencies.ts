import { FindClientByCpfUseCase } from "../../../../../../core/application/use-case/client/find-client-by-cpf"
import { makeFindClientByCpfRepository } from "../../../../../driven/persistence/typeorm/client/find-client-by-cpf-repository/make-find-client-by-cpf-repository"

export const makeGetClientByCpfFactory = async () => {
    const repository = await makeFindClientByCpfRepository()
    const useCase = new FindClientByCpfUseCase(repository)
    return useCase
}
