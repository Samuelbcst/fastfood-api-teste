import { FindClientAllRepository } from "../../../port/client/find-client-all-repository"
import { FindClientAllUseCase } from "."

export const makeFindClientAllUseCase = (
    repository: FindClientAllRepository
) => new FindClientAllUseCase(repository)
