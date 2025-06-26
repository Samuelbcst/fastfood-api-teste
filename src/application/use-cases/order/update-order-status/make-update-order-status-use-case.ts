import { UpdateOrderStatusUseCase } from ".";
import { UpdateOrderStatusRepository } from "../../../ports/order/update-order-status-repository";

export const makeUpdateOrderStatusUseCase = (
  repository: UpdateOrderStatusRepository
) => new UpdateOrderStatusUseCase(repository);
