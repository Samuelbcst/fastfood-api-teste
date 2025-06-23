import { ClientModel } from "../model"
import { FindClientByIdTypeORMRepository } from "./find-client-by-id-repository"
import dataSource from "../../"

export const makeFindClientByIdRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const clientRepository = dataSource.getRepository(ClientModel)
    return new FindClientByIdTypeORMRepository(clientRepository)
}
