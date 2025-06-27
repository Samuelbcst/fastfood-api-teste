import { makeFindCategoryAllUseCase } from "../../../../../../application/use-cases/category/find-category-all/make-find-category-all-use-case"
import { makeFindCategoryAllRepository } from "../../../../../../infrastructure/database/typeorm/category/find-category-all-repository/make-find-category-all-repository"

export const makeGetCategoryAllFactory = async () => {
    const repository = await makeFindCategoryAllRepository()
    const useCase = makeFindCategoryAllUseCase(repository)
    return useCase
}
