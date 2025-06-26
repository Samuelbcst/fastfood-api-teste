import { CategoryModel } from "../model"
import { FindCategoryByIdTypeORMRepository } from "./find-category-by-id-repository"
import dataSource from "../.."

export const makeFindCategoryByIdRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const categoryRepository = dataSource.getRepository(CategoryModel)
    return new FindCategoryByIdTypeORMRepository(categoryRepository)
}
