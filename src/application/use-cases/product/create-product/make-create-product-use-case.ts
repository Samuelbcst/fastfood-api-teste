import { CreateProductUseCase } from "."
import { CreateProductRepository } from "../../../repositories/product/create-product-repository"

export const makeCreateProductUseCase = (
    repository: CreateProductRepository
): CreateProductUseCase => new CreateProductUseCase(repository)
