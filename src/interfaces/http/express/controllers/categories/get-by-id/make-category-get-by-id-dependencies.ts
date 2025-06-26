import { makeFindCategoryByIdUseCase } from "../../../../../../application/use-cases/category/find-category-by-id/make-find-category-by-id-use-case"
import { makeFindCategoryByIdRepository } from "../../../../../../infrastructure/database/typeorm/category/find-category-by-id-repository/make-find-category-by-id-repository"

export const makeGetCategoryByIdFactory = async () => {
    const repository = await makeFindCategoryByIdRepository()
    const useCase = makeFindCategoryByIdUseCase(repository)
    return useCase
}
