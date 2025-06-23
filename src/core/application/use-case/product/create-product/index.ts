import { BaseEntity } from "../../../../domain/base-entity"
import { Product } from "../../../../domain/product/product"
import { CreateProductRepository } from "../../../port/product/create-product-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateProductInput = Omit<Product, keyof BaseEntity>

export class CreateProductUseCase implements UseCase<CreateProductInput, Product> {
    constructor(private createProductRepository: CreateProductRepository) {}

    async execute(input: CreateProductInput) {
        try {
            const created = await this.createProductRepository.create(input)
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
                        "Failed to create product"
                ),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.createProductRepository.finish()
    }
}
