import { CreateCategoryUseCase } from "."
import { CreateCategoryRepository } from "../../../port/category/create-category-repository"

export const makeCreateCategoryUseCase = (
    repository: CreateCategoryRepository
): CreateCategoryUseCase => new CreateCategoryUseCase(repository)
