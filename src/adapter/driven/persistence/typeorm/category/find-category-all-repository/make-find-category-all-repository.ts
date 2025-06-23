import { CategoryModel } from "../model"
import { FindCategoryAllTypeORMRepository } from "./find-category-all-repository"
import dataSource from "../../"

export const makeFindCategoryAllRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const categoryRepository = dataSource.getRepository(CategoryModel)
    return new FindCategoryAllTypeORMRepository(categoryRepository)
}
