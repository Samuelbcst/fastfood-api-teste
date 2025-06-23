import { ProductModel } from "../model"
import { FindProductByCategoryTypeORMRepository } from "./find-product-by-category-repository"
import dataSource from "../.."

export const makeFindProductByCategoryRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const productRepository = dataSource.getRepository(ProductModel)
    return new FindProductByCategoryTypeORMRepository(productRepository)
}
