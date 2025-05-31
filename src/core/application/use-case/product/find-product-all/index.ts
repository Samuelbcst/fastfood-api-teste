import { FindProductAllRepository } from "../../../port/product/find-product-all-repository"
import { Product } from "../../../../domain/product"
import { UseCase } from "../../base-use-case"

export class FindProductAllUseCase implements UseCase<void, Product[]> {
    constructor(private findProductAllRepository: FindProductAllRepository) {}

    async execute() {
        try {
            const products = await this.findProductAllRepository.execute()
            return {
                success: true,
                result: products,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findProductAllRepository.finish()
    }
}
