import { FindCategoryAllRepository } from "../../../port/category/find-category-all-repository"
import { FindCategoryAllUseCase } from "."

export const makeFindCategoryAllUseCase = (
    repository: FindCategoryAllRepository
) => new FindCategoryAllUseCase(repository)
