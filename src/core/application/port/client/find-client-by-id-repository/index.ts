import { Client } from "../../../../domain/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientByIdRepository
    extends RepositoryBase<number, Client | null> {}
