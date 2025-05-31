import { BaseEntity } from "../../../../domain/base-entity"
import { Product } from "../../../../domain/product"
import { CreateProductRepository } from "../../../port/product/create-product-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateProductInput = Omit<Product, keyof BaseEntity>

export class CreateProductUseCase implements UseCase<Product, void> {
    constructor(private createProductRepository: CreateProductRepository) {}

    async execute(input: CreateProductInput) {
        try {
            await this.createProductRepository.create(input)
            return {
                success: true,
                result: null,
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
