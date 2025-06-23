import { OrderItem } from "../../../../domain/order-item/order-item"
import { FindOrderItemByIdRepository } from "../../../port/order-item/find-order-item-by-id-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
}

export class FindOrderItemByIdUseCase implements UseCase<Input, OrderItem> {
    constructor(
        private findOrderItemByIdRepository: FindOrderItemByIdRepository
    ) {}

    async execute(input: Input) {
        try {
            const orderItem = await this.findOrderItemByIdRepository.execute(
                input.id
            )

            if (!orderItem) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Order item not found."),
                }
            }

            return {
                success: orderItem !== null,
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
        return this.findOrderItemByIdRepository.finish()
    }
}
