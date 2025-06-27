import { UpdateOrderStatusUseCase } from ".";
import { UpdateOrderStatusRepository } from "../../../repositories/order/update-order-status-repository";

export const makeUpdateOrderStatusUseCase = (
  repository: UpdateOrderStatusRepository
) => new UpdateOrderStatusUseCase(repository);
