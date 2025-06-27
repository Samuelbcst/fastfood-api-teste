import { FindOrderItemAllRepository } from "../../../repositories/order-item/find-order-item-all-repository"
import { OrderItem } from "../../../../domain/entities/order-item/order-item"
import { UseCase } from "../../base-use-case"

export class FindOrderItemAllUseCase implements UseCase<void, OrderItem[]> {
    constructor(private findOrderItemAllRepository: FindOrderItemAllRepository) {}

    async execute() {
        try {
            const orderItems = await this.findOrderItemAllRepository.execute()
            return {
                success: true,
                result: orderItems,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findOrderItemAllRepository.finish()
    }
}
