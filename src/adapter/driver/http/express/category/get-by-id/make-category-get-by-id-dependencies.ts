import { makeFindCategoryByIdUseCase } from "../../../../../../core/application/use-case/category/find-category-by-id/make-find-category-by-id-use-case"
import { makeFindCategoryByIdRepository } from "../../../../../driven/persistence/typeorm/category/find-category-by-id-repository/make-find-category-by-id-repository"

export const makeGetCategoryByIdFactory = async () => {
    const repository = await makeFindCategoryByIdRepository()
    const useCase = makeFindCategoryByIdUseCase(repository)
    return useCase
}
