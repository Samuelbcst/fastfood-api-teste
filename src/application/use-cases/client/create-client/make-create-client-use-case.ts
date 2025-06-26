import { CreateClientUseCase } from "."
import { CreateClientRepository } from "../../../ports/client/create-client-repository"

export const makeCreateClientUseCase = (
    repository: CreateClientRepository
): CreateClientUseCase => new CreateClientUseCase(repository)
