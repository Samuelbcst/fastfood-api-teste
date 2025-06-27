import { Client } from "../../../../domain/entities/client/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientByIdRepository
    extends RepositoryBase<number, Client | null> {}
