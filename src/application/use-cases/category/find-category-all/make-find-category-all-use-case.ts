import { FindCategoryAllRepository } from "../../../ports/category/find-category-all-repository"
import { FindCategoryAllUseCase } from "."

export const makeFindCategoryAllUseCase = (
    repository: FindCategoryAllRepository
) => new FindCategoryAllUseCase(repository)
