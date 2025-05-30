import { Category } from "../../../../domain/category"
import { FindCategoryByIdRepository } from "../../../port/category/find-category-by-id-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
}

export class FindCategoryByIdUseCase implements UseCase<Input, Category> {
    constructor(
        private findCategoryByIdRepository: FindCategoryByIdRepository
    ) {}

    async execute(input: Input) {
        try {
            const category = await this.findCategoryByIdRepository.execute(
                input.id
            )

            if (!category) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Category not found."),
                }
            }

            return {
                success: category !== null,
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
        return this.findCategoryByIdRepository.finish()
    }
}
