import { DeleteClientUseCase } from "."
import { DeleteClientRepository } from "../../../repositories/client/delete-client-repository"

export const makeDeleteClientUseCase = (
    repository: DeleteClientRepository
) => new DeleteClientUseCase(repository)
