import { ProductModel } from "../model"
import { DeleteProductTypeORMRepository } from "./delete-product-repository"
import dataSource from "../.."

export const makeDeleteProductRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new DeleteProductTypeORMRepository(productRepository)
}
