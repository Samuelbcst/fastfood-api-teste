import { FindCategoryByIdUseCase } from "."
import { FindCategoryByIdRepository } from "../../../repositories/category/find-category-by-id-repository"

export const makeFindCategoryByIdUseCase = (
    repository: FindCategoryByIdRepository
) => new FindCategoryByIdUseCase(repository)
