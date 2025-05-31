import { ClientModel } from "../model"
import { FindClientAllTypeORMRepository } from "./find-client-all-repository"
import dataSource from "../../"

export const makeFindClientAllRepository = async () => {
    await dataSource.initialize()
    const clientRepository = dataSource.getRepository(ClientModel)
    return new FindClientAllTypeORMRepository(clientRepository)
}
