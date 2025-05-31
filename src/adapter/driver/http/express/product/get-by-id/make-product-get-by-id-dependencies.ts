import { makeFindProductByIdUseCase } from "../../../../../../core/application/use-case/product/find-product-by-id/make-find-product-by-id-use-case"
import { makeFindProductByIdRepository } from "../../../../../driven/persistence/typeorm/product/find-product-by-id-repository/make-find-product-by-id-repository"

export const makeGetProductByIdFactory = async () => {
    const repository = await makeFindProductByIdRepository()
    const useCase = makeFindProductByIdUseCase(repository)
    return useCase
}
