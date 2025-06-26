import { Repository } from "typeorm"
import { Client } from "../../../../../domain/entities/client/client"
import { ClientModel } from "../model"
import { FindClientAllRepository } from "../../../../../application/ports/client/find-client-all-repository"

export class FindClientAllTypeORMRepository
    implements FindClientAllRepository
{
    constructor(private readonly repository: Repository<ClientModel>) {}

    execute(): Promise<Client[]> {
        return this.repository.find()
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
