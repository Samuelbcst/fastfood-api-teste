import { UpdateClientUseCase } from "."
import { UpdateClientRepository } from "../../../ports/client/update-client-repository"

export const makeUpdateClientUseCase = (
    repository: UpdateClientRepository
) => new UpdateClientUseCase(repository)
