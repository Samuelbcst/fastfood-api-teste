import { ProductModel } from "../model"
import { UpdateProductTypeORMRepository } from "./update-product-repository"
import dataSource from "../.."

export const makeUpdateProductRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new UpdateProductTypeORMRepository(productRepository)
}
