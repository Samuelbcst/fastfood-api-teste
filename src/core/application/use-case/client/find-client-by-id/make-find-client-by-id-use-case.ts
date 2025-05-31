import { FindClientByIdUseCase } from "."
import { FindClientByIdRepository } from "../../../port/client/find-client-by-id-repository"

export const makeFindClientByIdUseCase = (
    repository: FindClientByIdRepository
) => new FindClientByIdUseCase(repository)
