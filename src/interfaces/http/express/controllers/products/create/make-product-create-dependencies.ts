import { makeCreateProductUseCase } from "../../../../../../application/use-cases/product/create-product/make-create-product-use-case"
import { makeCreateProductRepository } from "../../../../../../infrastructure/database/typeorm/product/create-product-repository/make-create-product-repository"

export const makeCreateProductFactory = async () => {
    const repository = await makeCreateProductRepository()
    const useCase = makeCreateProductUseCase(repository)
    return useCase
}
