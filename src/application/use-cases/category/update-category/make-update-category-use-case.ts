import { UpdateCategoryUseCase } from "."
import { UpdateCategoryRepository } from "../../../repositories/category/update-category-repository"

export const makeUpdateCategoryUseCase = (
    repository: UpdateCategoryRepository
) => new UpdateCategoryUseCase(repository)
