import { Repository } from "typeorm"
import { Client } from "../../../../../../core/domain/client/client"
import { ClientModel } from "../model"
import { FindClientByCpfRepository } from "../../../../../../core/application/port/client/find-client-by-cpf-repository"

export class FindClientByCpfTypeORMRepository implements FindClientByCpfRepository {
    constructor(private readonly repository: Repository<ClientModel>) {}

    async execute(cpf: string): Promise<Client | null> {
        return this.repository.findOneBy({ cpf })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
