import { FindClientByCpfUseCase } from "."
import { FindClientByCpfRepository } from "../../../ports/client/find-client-by-cpf-repository"

export const makeFindClientByCpfUseCase = (
    repository: FindClientByCpfRepository
) => new FindClientByCpfUseCase(repository)
