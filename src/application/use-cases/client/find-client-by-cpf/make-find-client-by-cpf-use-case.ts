import { FindClientByCpfUseCase } from "."
import { FindClientByCpfRepository } from "../../../repositories/client/find-client-by-cpf-repository"

export const makeFindClientByCpfUseCase = (
    repository: FindClientByCpfRepository
) => new FindClientByCpfUseCase(repository)
