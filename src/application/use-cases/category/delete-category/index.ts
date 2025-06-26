import { Category } from "../../../../domain/entities/category/category"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeleteCategoryRepository } from "../../../ports/category/delete-category-repository"

interface Input {
    id: number
}

export class DeleteCategoryUseCase implements UseCase<Input, Category | null> {
    constructor(private deleteCategoryRepository: DeleteCategoryRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deleteCategoryRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Category not found."),
                }
            }
            return {
                success: true,
                result: deleted,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.deleteCategoryRepository.finish()
    }
}
