import { makeFindProductAllUseCase } from "../../../../../../application/use-cases/product/find-product-all/make-find-product-all-use-case"
import { makeFindProductAllRepository } from "../../../../../../infrastructure/database/typeorm/product/find-product-all-repository/make-find-product-all-repository"

export const makeGetProductAllFactory = async () => {
    const repository = await makeFindProductAllRepository()
    const useCase = makeFindProductAllUseCase(repository)
    return useCase
}
