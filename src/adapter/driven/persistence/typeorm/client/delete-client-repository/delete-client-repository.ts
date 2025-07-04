import { Repository } from "typeorm"
import { Client } from "../../../../../../core/domain/client/client"
import { ClientModel } from "../model"
import { DeleteClientRepository } from "../../../../../../core/application/port/client/delete-client-repository"

export class DeleteClientTypeORMRepository implements DeleteClientRepository {
    constructor(private readonly repository: Repository<ClientModel>) {}

    async execute(param: { id: Client["id"] }): Promise<Client | null> {
        const { id } = param;
        const client = await this.repository.findOneBy({ id });
        if (!client) return null;
        await this.repository.remove(client);
        return client;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
