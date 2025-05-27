import { Request } from "express"
import { factoryDataSource } from "../../driven/persistence/typeorm"
import { ProductServices } from "../../../core/application/use-cases/product"
import { ProductModel } from "../../driven/persistence/typeorm/product/model"
import { ProductTypeORMRepository } from "../../driven/persistence/typeorm/product/repository"

export const getProductById = async (params: Request["params"]) => {
    const id = Number(params.id)

    if (isNaN(id)) throw new Error("Id must be a number")

    const dataSource = factoryDataSource()

    const productRepository = dataSource.getRepository(ProductModel)

    const productServices = new ProductServices(
        new ProductTypeORMRepository(productRepository)
    )

    return productServices.findById(id)
}
