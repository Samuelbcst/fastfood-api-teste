import { Client } from "../../../../domain/client"
import { RepositoryBase } from "../../repository-base"

export interface UpdateClientRepository extends RepositoryBase<{
    id: number
    name?: string
    email?: string
    cpf?: string
}, Client | null> {}
