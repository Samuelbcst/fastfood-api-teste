import { FindClientByIdUseCase } from "."
import { FindClientByIdRepository } from "../../../ports/client/find-client-by-id-repository"

export const makeFindClientByIdUseCase = (
    repository: FindClientByIdRepository
) => new FindClientByIdUseCase(repository)
