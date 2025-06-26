import { FindCategoryByIdUseCase } from "."
import { FindCategoryByIdRepository } from "../../../ports/category/find-category-by-id-repository"

export const makeFindCategoryByIdUseCase = (
    repository: FindCategoryByIdRepository
) => new FindCategoryByIdUseCase(repository)
