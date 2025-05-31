import { ClientModel } from "../model"
import { UpdateClientTypeORMRepository } from "./update-client-repository"
import dataSource from "../../"

export const makeUpdateClientRepository = async () => {
    await dataSource.initialize()
    const clientRepository = dataSource.getRepository(ClientModel)
    return new UpdateClientTypeORMRepository(clientRepository)
}
