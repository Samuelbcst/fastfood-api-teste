import { DeleteClientUseCase } from "."
import { DeleteClientRepository } from "../../../ports/client/delete-client-repository"

export const makeDeleteClientUseCase = (
    repository: DeleteClientRepository
) => new DeleteClientUseCase(repository)
