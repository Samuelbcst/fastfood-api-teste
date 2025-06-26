import { makeDeleteCategoryUseCase } from "../../../../../../application/use-cases/category/delete-category/make-delete-category-use-case"
import { makeDeleteCategoryRepository } from "../../../../../../infrastructure/database/typeorm/category/delete-category-repository/make-delete-category-repository"

export const makeDeleteCategoryFactory = async () => {
    const deleteCategoryRepository = await makeDeleteCategoryRepository()
    const useCase = makeDeleteCategoryUseCase(deleteCategoryRepository)
    return useCase
}
