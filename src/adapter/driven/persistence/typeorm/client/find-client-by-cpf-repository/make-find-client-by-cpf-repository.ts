import { ClientModel } from "../model"
import { FindClientByCpfTypeORMRepository } from "./find-client-by-cpf-repository"
import dataSource from "../.."

export const makeFindClientByCpfRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const clientRepository = dataSource.getRepository(ClientModel)
    return new FindClientByCpfTypeORMRepository(clientRepository)
}
