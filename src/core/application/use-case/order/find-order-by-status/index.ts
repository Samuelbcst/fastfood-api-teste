import { FindOrderByStatusRepository } from '../../../port/order/find-order-by-status-repository'
import { Order } from '../../../../domain/order/order'
import { UseCase } from '../../base-use-case'
import { CustomError } from '../../custom-error'

interface Input {
    status: string
}

export class FindOrderByStatusUseCase implements UseCase<Input, Order[]> {
    constructor(private readonly repository: FindOrderByStatusRepository) {}

    async execute(input: Input) {
        try {
            const orders = await this.repository.execute(input.status)
            if (!orders || orders.length === 0) {
                return {
                    success: false,
                    result: [],
                    error: new CustomError(404, 'No orders found for this status.'),
                }
            }
            return {
                success: true,
                result: orders,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
                error: new CustomError(400, (error as Error)?.message || 'Failed to find orders'),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.repository.finish()
    }
}
