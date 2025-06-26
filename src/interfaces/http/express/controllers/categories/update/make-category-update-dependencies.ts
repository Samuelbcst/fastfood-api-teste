import { makeUpdateCategoryUseCase } from "../../../../../../application/use-cases/category/update-category/make-update-category-use-case"
import { makeUpdateCategoryRepository } from "../../../../../../infrastructure/database/typeorm/category/update-category-repository/make-update-category-repository"

export const makeUpdateCategoryFactory = async () => {
    const updateCategoryRepository = await makeUpdateCategoryRepository()
    const useCase = makeUpdateCategoryUseCase(updateCategoryRepository)
    return useCase
}
