import { CreateCategoryUseCase } from "."
import { CreateCategoryRepository } from "../../../repositories/category/create-category-repository"

export const makeCreateCategoryUseCase = (
    repository: CreateCategoryRepository
): CreateCategoryUseCase => new CreateCategoryUseCase(repository)
