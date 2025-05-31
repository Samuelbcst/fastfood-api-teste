import { ClientModel } from "../model"
import { TypeOrmCreateClientRepository } from "./create-client-repository"
import dataSource from "../../"

export const makeCreateClientRepository = async () => {
    await dataSource.initialize()
    const clientRepository = dataSource.getRepository(ClientModel)
    return new TypeOrmCreateClientRepository(clientRepository)
}
