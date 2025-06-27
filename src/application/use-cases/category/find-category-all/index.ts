import { FindCategoryAllRepository } from "../../../repositories/category/find-category-all-repository"
import { Category } from "../../../../domain/entities/category/category"
import { UseCase } from "../../base-use-case"

export class FindCategoryAllUseCase implements UseCase<void, Category[]> {
    constructor(private findCategoryAllRepository: FindCategoryAllRepository) {}

    async execute() {
        try {
            const categories = await this.findCategoryAllRepository.execute()
            return {
                success: true,
                result: categories,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findCategoryAllRepository.finish()
    }
}
