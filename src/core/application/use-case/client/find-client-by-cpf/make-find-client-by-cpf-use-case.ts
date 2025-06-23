import { FindClientByCpfUseCase } from "."
import { FindClientByCpfRepository } from "../../../port/client/find-client-by-cpf-repository"

export const makeFindClientByCpfUseCase = (
    repository: FindClientByCpfRepository
) => new FindClientByCpfUseCase(repository)
