import { CreateCategoryUseCase } from "."
import { CreateCategoryRepository } from "../../../ports/category/create-category-repository"

export const makeCreateCategoryUseCase = (
    repository: CreateCategoryRepository
): CreateCategoryUseCase => new CreateCategoryUseCase(repository)
