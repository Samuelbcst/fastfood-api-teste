import { Request } from "express"
import { ClientServices } from "../../../core/application/use-cases/client"
import { factoryDataSource } from "../../driven/persistence/typeorm"
import { ClientModel } from "../../driven/persistence/typeorm/client/model"
import { ClientTypeORMRepository } from "../../driven/persistence/typeorm/client/repository"

export const getClientById = async (params: Request["params"]) => {
    const id = Number(params.id)

    if (isNaN(id)) throw new Error("Id must be a number")

    const dataSource = factoryDataSource()

    const clientRepository = dataSource.getRepository(ClientModel)

    const clientServices = new ClientServices(
        new ClientTypeORMRepository(clientRepository)
    )

    return clientServices.findById(id)
}
