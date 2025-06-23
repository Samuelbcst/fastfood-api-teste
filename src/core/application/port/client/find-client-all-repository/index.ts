import { Client } from "../../../../domain/client/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientAllRepository
    extends RepositoryBase<void, Client[]> {}
