import { ClientModel } from "../model"
import { TypeOrmCreateClientRepository } from "./create-client-repository"
import dataSource from "../../"

export const makeCreateClientRepository = async () => {
    if (!dataSource.isInitialized && dataSource.initialize) {
        await dataSource.initialize()
    }
    const repository = dataSource.getRepository(ClientModel)
    return new TypeOrmCreateClientRepository(repository)
}
