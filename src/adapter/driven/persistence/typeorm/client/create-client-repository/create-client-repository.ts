import { Repository } from "typeorm/repository/Repository"
import { CreateClientRepository } from "../../../../../../core/application/port/client/create-client-repository"
import { BaseEntity } from "../../../../../../core/domain/base-entity"
import { Client } from "../../../../../../core/domain/client"
import { ClientModel } from "../model"

export class TypeOrmCreateClientRepository
    implements CreateClientRepository
{
    constructor(private readonly repository: Repository<ClientModel>) {}

    async create({ name, email, cpf }: Omit<Client, keyof BaseEntity>) {
        const client = ClientModel.create({ name, email, cpf })
        await client.save()
        return client
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
