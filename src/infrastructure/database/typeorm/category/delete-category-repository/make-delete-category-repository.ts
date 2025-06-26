import { CategoryModel } from "../model"
import { DeleteCategoryTypeORMRepository } from "./delete-category-repository"
import dataSource from "../.."

export const makeDeleteCategoryRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const categoryRepository = dataSource.getRepository(CategoryModel)
    return new DeleteCategoryTypeORMRepository(categoryRepository)
}
