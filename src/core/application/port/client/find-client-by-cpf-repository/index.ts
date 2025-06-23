import { Client } from "../../../../domain/client/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientByCpfRepository
    extends RepositoryBase<string, Client | null> {}
