import { makeFindCategoryAllUseCase } from "../../../../../../core/application/use-case/category/find-category-all/make-find-category-all-use-case"
import { makeFindCategoryAllRepository } from "../../../../../driven/persistence/typeorm/category/find-category-all-repository/make-find-category-all-repository"

export const makeGetCategoryAllFactory = async () => {
    const repository = await makeFindCategoryAllRepository()
    const useCase = makeFindCategoryAllUseCase(repository)
    return useCase
}
