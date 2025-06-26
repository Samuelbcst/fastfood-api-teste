import { FindProductByCategoryRepository } from "../../../ports/product/find-product-by-category-repository"
import { Product } from "../../../../domain/entities/product/product"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    categoryId: number
}

export class FindProductByCategoryUseCase implements UseCase<Input, Product[]> {
    constructor(private findProductByCategoryRepository: FindProductByCategoryRepository) {}

    async execute(input: Input) {
        try {
            const products = await this.findProductByCategoryRepository.execute(input.categoryId)
            if (!products || (Array.isArray(products) && products.length === 0)) {
                return {
                    success: false,
                    result: [],
                    error: new CustomError(404, "No products found for this category."),
                }
            }
            return {
                success: true,
                result: Array.isArray(products) ? products : [products],
            }
        } catch (error) {
            return {
                success: false,
                result: [],
                error: new CustomError(400, (error as Error)?.message || "Failed to find products by category"),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findProductByCategoryRepository.finish()
    }
}
