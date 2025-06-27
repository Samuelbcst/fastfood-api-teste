import { Repository } from "typeorm"
import { Client } from "../../../../../domain/entities/client/client"
import { ClientModel } from "../model"
import { FindClientByIdRepository } from "../../../../../application/repositories/client/find-client-by-id-repository"

export class FindClientByIdTypeORMRepository
    implements FindClientByIdRepository
{
    constructor(private readonly repository: Repository<ClientModel>) {}

    execute(id: Client["id"]) {
        return this.repository.findOneBy({ id })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
