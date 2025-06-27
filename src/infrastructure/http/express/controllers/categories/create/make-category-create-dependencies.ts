import { makeCreateCategoryUseCase } from "../../../../../../application/use-cases/category/create-category/make-create-category-use-case"
import { makeCreateCategoryRepository } from "../../../../../../infrastructure/database/typeorm/category/create-category-repository/make-create-category-repository"

export const makeCreateCategoryFactory = async () => {
    const repository = await makeCreateCategoryRepository()
    const useCase = makeCreateCategoryUseCase(repository)
    return useCase
}
