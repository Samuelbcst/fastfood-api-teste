import { UpdateCategoryUseCase } from "."
import { UpdateCategoryRepository } from "../../../ports/category/update-category-repository"

export const makeUpdateCategoryUseCase = (
    repository: UpdateCategoryRepository
) => new UpdateCategoryUseCase(repository)
