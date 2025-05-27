import { Client } from "../../domain/client"
import { ClientRepository } from "../ports/client/repository"

export class ClientServices {
    constructor(private clientRepository: ClientRepository) {}

    findById(id: number) {
        return this.clientRepository.findById(id)
    }

    findFirst(props: Partial<Client>) {
        return this.clientRepository.findFirst(props)
    }

    findAll(props: Partial<Client>) {
        return this.clientRepository.findAll(props)
    }

    insertAndSave(entity: Client) {
        return this.clientRepository.insertAndSave(entity)
    }

    patch(entity: Client) {
        return this.clientRepository.patch(entity)
    }

    removeById(id: number) {
        return this.clientRepository.removeById(id)
    }
}
