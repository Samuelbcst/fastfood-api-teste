import { FindOrderByClientRepository } from '../../../port/order/find-order-by-client-repository'
import { Order } from '../../../../domain/order/order'
import { UseCase } from '../../base-use-case'
import { CustomError } from '../../custom-error'

interface Input {
    clientId: number
}

export class FindOrderByClientUseCase implements UseCase<Input, Order[]> {
    constructor(private readonly repository: FindOrderByClientRepository) {}

    async execute(input: Input) {
        try {
            const orders = await this.repository.execute(input.clientId)
            if (!orders || orders.length === 0) {
                return {
                    success: false,
                    result: [],
                    error: new CustomError(404, 'No orders found for this client.'),
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
