import { makeDeleteCategoryUseCase } from "../../../../../../core/application/use-case/category/delete-category/make-delete-category-use-case"
import { makeDeleteCategoryRepository } from "../../../../../driven/persistence/typeorm/category/delete-category-repository/make-delete-category-repository"

export const makeDeleteCategoryFactory = async () => {
    const deleteCategoryRepository = await makeDeleteCategoryRepository()
    const useCase = makeDeleteCategoryUseCase(deleteCategoryRepository)
    return useCase
}
