import { BaseEntity } from "../../../../domain/base-entity"
import { Category } from "../../../../domain/category/category"
import { CreateCategoryRepository } from "../../../port/category/create-category-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateCategoryInput = Omit<Category, keyof BaseEntity>

export class CreateCategoryUseCase implements UseCase<CreateCategoryInput, Category> {
    constructor(private createCategoryRepository: CreateCategoryRepository) {}

    async execute(input: CreateCategoryInput) {
        try {
            const created = await this.createCategoryRepository.create(input)
            return {
                success: true,
                result: created,
            }
        } catch (error: unknown) {
            return {
                success: false,
                result: null,
                error: new CustomError(
                    400,
                    (error as Error | undefined)?.message ||
                        "Failed to create category"
                ),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.createCategoryRepository.finish()
    }
}
