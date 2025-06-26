import { Order } from '../../../../domain/entities/order/order';
import { UseCase } from '../../base-use-case';
import { CustomError } from '../../custom-error';
import { UpdateOrderStatusRepository } from '../../../ports/order/update-order-status-repository';

export interface UpdateOrderStatusInput {
  id: number;
  status: string;
}

export class UpdateOrderStatusUseCase implements UseCase<UpdateOrderStatusInput, Order> {
  constructor(private readonly repository: UpdateOrderStatusRepository) {}

  async execute(input: UpdateOrderStatusInput) {
    try {
      const order = await this.repository.execute(input);
      if (!order) {
        return {
          success: false,
          result: null,
          error: new CustomError(404, 'Order not found.'),
        };
      }
      return {
        success: true,
        result: order,
      };
    } catch (error) {
      return {
        success: false,
        result: null,
        error: new CustomError(400, (error as Error)?.message || 'Failed to update order status'),
      };
    }
  }

  onFinish(): Promise<void> {
    return this.repository.finish();
  }
}
