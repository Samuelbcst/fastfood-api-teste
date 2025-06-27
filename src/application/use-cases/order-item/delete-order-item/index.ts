import { OrderItem } from "../../../../domain/entities/order-item/order-item"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeleteOrderItemRepository } from "../../../repositories/order-item/delete-order-item-repository"

interface Input {
    id: number
}

export class DeleteOrderItemUseCase implements UseCase<Input, OrderItem | null> {
    constructor(private deleteOrderItemRepository: DeleteOrderItemRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deleteOrderItemRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Order item not found."),
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
        return this.deleteOrderItemRepository.finish()
    }
}
