import { ClientModel } from "../model"
import { DeleteClientTypeORMRepository } from "./delete-client-repository"
import dataSource from "../../"

export const makeDeleteClientRepository = async () => {
    await dataSource.initialize()
    const clientRepository = dataSource.getRepository(ClientModel)
    return new DeleteClientTypeORMRepository(clientRepository)
}
