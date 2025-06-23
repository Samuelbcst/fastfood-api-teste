import { CategoryModel } from "../model"
import { UpdateCategoryTypeORMRepository } from "./update-category-repository"
import dataSource from "../../"

export const makeUpdateCategoryRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const categoryRepository = dataSource.getRepository(CategoryModel)
    return new UpdateCategoryTypeORMRepository(categoryRepository)
}
