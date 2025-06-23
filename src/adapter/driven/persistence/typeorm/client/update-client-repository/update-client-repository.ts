import { Repository } from "typeorm"
import { Client } from "../../../../../../core/domain/client/client"
import { ClientModel } from "../model"
import { UpdateClientRepository } from "../../../../../../core/application/port/client/update-client-repository"

export class UpdateClientTypeORMRepository
    implements UpdateClientRepository
{
    constructor(private readonly repository: Repository<ClientModel>) {}

    async execute(param: { id: Client["id"]; name?: Client["name"]; email?: Client["email"]; cpf?: Client["cpf"] }): Promise<Client | null> {
        const { id, name, email, cpf } = param;
        const client = await this.repository.findOneBy({ id });
        if (!client) return null;
        if (name !== undefined) client.name = name;
        if (email !== undefined) client.email = email;
        if (cpf !== undefined) client.cpf = cpf;
        client.updatedAt = new Date();
        await this.repository.save(client);
        return client;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
