import { Product } from "../../../../domain/entities/product/product"
import { FindProductByIdRepository } from "../../../repositories/product/find-product-by-id-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
}

export class FindProductByIdUseCase implements UseCase<Input, Product> {
    constructor(
        private findProductByIdRepository: FindProductByIdRepository
    ) {}

    async execute(input: Input) {
        try {
            const product = await this.findProductByIdRepository.execute(
                input.id
            )

            if (!product) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Product not found."),
                }
            }

            return {
                success: product !== null,
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
        return this.findProductByIdRepository.finish()
    }
}
