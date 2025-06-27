import { DeleteCategoryUseCase } from "."
import { DeleteCategoryRepository } from "../../../repositories/category/delete-category-repository"

export const makeDeleteCategoryUseCase = (
    repository: DeleteCategoryRepository
) => new DeleteCategoryUseCase(repository)
