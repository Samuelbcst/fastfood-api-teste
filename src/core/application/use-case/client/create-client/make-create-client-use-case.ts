import { CreateClientUseCase } from "."
import { CreateClientRepository } from "../../../port/client/create-client-repository"

export const makeCreateClientUseCase = (
    repository: CreateClientRepository
): CreateClientUseCase => new CreateClientUseCase(repository)
