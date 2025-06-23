import { ProductModel } from "../model"
import { FindProductAllTypeORMRepository } from "./find-product-all-repository"
import dataSource from "../../"

export const makeFindProductAllRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new FindProductAllTypeORMRepository(productRepository)
}
