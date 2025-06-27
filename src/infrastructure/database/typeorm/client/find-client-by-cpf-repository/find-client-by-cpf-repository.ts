import { Repository } from "typeorm"
import { Client } from "../../../../../domain/entities/client/client"
import { ClientModel } from "../model"
import { FindClientByCpfRepository } from "../../../../../application/repositories/client/find-client-by-cpf-repository"

export class FindClientByCpfTypeORMRepository implements FindClientByCpfRepository {
    constructor(private readonly repository: Repository<ClientModel>) {}

    async execute(cpf: string): Promise<Client | null> {
        return this.repository.findOneBy({ cpf })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
