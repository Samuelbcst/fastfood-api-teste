import { OrderItem } from "../../../../domain/order-item"
import { UpdateOrderItemRepository } from "../../../port/order-item/update-order-item-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
    name?: string
    description?: string
    price?: number
    categoryId?: number
}

export class UpdateOrderItemUseCase implements UseCase<Input, OrderItem> {
    constructor(
        private updateOrderItemRepository: UpdateOrderItemRepository
    ) {}

    async execute(input: Input) {
        try {
            const orderItem = await this.updateOrderItemRepository.execute(input)

            if (!orderItem) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Product not found."),
                }
            }

            return {
                success: true,
                result: orderItem,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.updateOrderItemRepository.finish()
    }
}
