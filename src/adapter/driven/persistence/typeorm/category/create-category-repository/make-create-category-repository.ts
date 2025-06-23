import { CategoryModel } from "../model"
import { TypeOrmCreateCategoryRepository } from "./create-category-repository"
import dataSource from "../../"

export const makeCreateCategoryRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const categoryRepository = dataSource.getRepository(CategoryModel)
    return new TypeOrmCreateCategoryRepository(categoryRepository)
}
