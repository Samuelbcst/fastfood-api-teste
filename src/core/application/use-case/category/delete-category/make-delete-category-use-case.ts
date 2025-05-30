import { DeleteCategoryUseCase } from "."
import { DeleteCategoryRepository } from "../../../port/category/delete-category-repository"

export const makeDeleteCategoryUseCase = (
    repository: DeleteCategoryRepository
) => new DeleteCategoryUseCase(repository)
