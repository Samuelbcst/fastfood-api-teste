import { UpdateClientUseCase } from "."
import { UpdateClientRepository } from "../../../port/client/update-client-repository"

export const makeUpdateClientUseCase = (
    repository: UpdateClientRepository
) => new UpdateClientUseCase(repository)
