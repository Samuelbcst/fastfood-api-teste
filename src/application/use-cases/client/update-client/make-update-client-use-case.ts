import { UpdateClientUseCase } from "."
import { UpdateClientRepository } from "../../../repositories/client/update-client-repository"

export const makeUpdateClientUseCase = (
    repository: UpdateClientRepository
) => new UpdateClientUseCase(repository)
