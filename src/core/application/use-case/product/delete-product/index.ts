import { Product } from "../../../../domain/product/product"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeleteProductRepository } from "../../../port/product/delete-product-repository"

interface Input {
    id: number
}

export class DeleteProductUseCase implements UseCase<Input, Product | null> {
    constructor(private deleteProductRepository: DeleteProductRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deleteProductRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Product not found."),
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
        return this.deleteProductRepository.finish()
    }
}
