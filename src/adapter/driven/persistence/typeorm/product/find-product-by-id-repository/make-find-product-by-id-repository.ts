import { ProductModel } from "../model"
import { FindProductByIdTypeORMRepository } from "./find-product-by-id-repository"
import dataSource from "../../"

export const makeFindProductByIdRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new FindProductByIdTypeORMRepository(productRepository)
}
