import { Repository } from "typeorm"
import { Client } from "../../../../../../core/domain/client"
import { ClientModel } from "../model"
import { FindClientByIdRepository } from "../../../../../../core/application/port/client/find-client-by-id-repository"

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
