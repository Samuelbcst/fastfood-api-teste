import { Order } from "../../../../domain/order/order"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeleteOrderRepository } from "../../../port/order/delete-order-repository"

interface Input {
    id: number
}

export class DeleteOrderUseCase implements UseCase<Input, Order | null> {
    constructor(private deleteOrderRepository: DeleteOrderRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deleteOrderRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Order not found."),
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
        return this.deleteOrderRepository.finish()
    }
}
