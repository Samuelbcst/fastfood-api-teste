import { Client } from "../../../../domain/entities/client/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientAllRepository
    extends RepositoryBase<void, Client[]> {}
