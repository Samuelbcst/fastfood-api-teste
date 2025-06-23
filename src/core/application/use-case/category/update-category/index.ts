import { Category } from "../../../../domain/category/category"
import { UpdateCategoryRepository } from "../../../port/category/update-category-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
    name?: string
    description?: string
}

export class UpdateCategoryUseCase implements UseCase<Input, Category> {
    constructor(
        private updateCategoryRepository: UpdateCategoryRepository
    ) {}

    async execute(input: Input) {
        try {
            const category = await this.updateCategoryRepository.execute(input)

            if (!category) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Category not found."),
                }
            }

            return {
                success: true,
                result: category,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.updateCategoryRepository.finish()
    }
}
