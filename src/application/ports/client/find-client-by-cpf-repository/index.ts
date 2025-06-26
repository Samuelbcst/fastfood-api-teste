import { Client } from "../../../../domain/entities/client/client"
import { RepositoryBase } from "../../repository-base"

export interface FindClientByCpfRepository
    extends RepositoryBase<string, Client | null> {}
