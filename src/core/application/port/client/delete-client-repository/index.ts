import { Client } from "../../../../domain/client/client"
import { RepositoryBase } from "../../repository-base"

export interface DeleteClientRepository extends RepositoryBase<{
    id: number
}, Client | null> {}
