import { Repository } from "typeorm"
import { ClientModel } from "./model"
import { Client } from "../../../../../core/domain/client"

// Define the ClientRepository interface if it does not exist in the imported module
export interface ClientRepository {
    findById(id: Client["id"]): Promise<ClientModel | null>;
    findFirst(props: Partial<ClientModel>): Promise<ClientModel | null>;
    findAll(props: Partial<ClientModel>): Promise<ClientModel[]>;
    insertAndSave(props: ClientModel): Promise<ClientModel>;
    patch(entity: ClientModel): Promise<ClientModel>;
    removeById(id: ClientModel["id"]): Promise<void>;
}

export class ClientTypeORMRepository implements ClientRepository {
    constructor(private readonly repository: Repository<ClientModel>) {}

    findById(id: Client["id"]) {
        return this.repository.findOneBy({ id })
    }

    findFirst(props: Partial<Client>) {
        return this.repository.findOne({ where: props })
    }

    findAll(props: Partial<Client>) {
        return this.repository.find({ where: props })
    }

    insertAndSave(props: Client) {
        const client = this.repository.create(props)
        return this.repository.save(client)
    }

    patch(entity: Client) {
        return this.repository.save(entity)
    }

    async removeById(id: Client["id"]) {
        await this.repository.delete({ id })
    }
}
