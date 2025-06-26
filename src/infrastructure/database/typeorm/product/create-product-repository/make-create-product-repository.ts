import { ProductModel } from "../model"
import { TypeOrmCreateProductRepository } from "./create-product-repository"
import dataSource from "../.."

export const makeCreateProductRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new TypeOrmCreateProductRepository(productRepository)
}
