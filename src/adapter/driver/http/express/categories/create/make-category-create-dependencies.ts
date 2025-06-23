import { makeCreateCategoryUseCase } from "../../../../../../core/application/use-case/category/create-category/make-create-category-use-case"
import { makeCreateCategoryRepository } from "../../../../../driven/persistence/typeorm/category/create-category-repository/make-create-category-repository"

export const makeCreateCategoryFactory = async () => {
    const repository = await makeCreateCategoryRepository()
    const useCase = makeCreateCategoryUseCase(repository)
    return useCase
}
