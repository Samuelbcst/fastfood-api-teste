import { DeleteClientUseCase } from "."
import { DeleteClientRepository } from "../../../port/client/delete-client-repository"

export const makeDeleteClientUseCase = (
    repository: DeleteClientRepository
) => new DeleteClientUseCase(repository)
