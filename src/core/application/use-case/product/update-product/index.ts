import { Product } from "../../../../domain/product"
import { UpdateProductRepository } from "../../../port/product/update-product-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
    name?: string
    description?: string
    price?: number
    categoryId?: number
}

export class UpdateProductUseCase implements UseCase<Input, Product> {
    constructor(
        private updateProductRepository: UpdateProductRepository
    ) {}

    async execute(input: Input) {
        try {
            const product = await this.updateProductRepository.execute(input)

            if (!product) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Product not found."),
                }
            }

            return {
                success: true,
                result: product,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.updateProductRepository.finish()
    }
}
