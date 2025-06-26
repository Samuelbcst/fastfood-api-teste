import { DeleteCategoryUseCase } from "."
import { DeleteCategoryRepository } from "../../../ports/category/delete-category-repository"

export const makeDeleteCategoryUseCase = (
    repository: DeleteCategoryRepository
) => new DeleteCategoryUseCase(repository)
