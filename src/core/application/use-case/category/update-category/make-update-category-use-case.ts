import { UpdateCategoryUseCase } from "."
import { UpdateCategoryRepository } from "../../../port/category/update-category-repository"

export const makeUpdateCategoryUseCase = (
    repository: UpdateCategoryRepository
) => new UpdateCategoryUseCase(repository)
