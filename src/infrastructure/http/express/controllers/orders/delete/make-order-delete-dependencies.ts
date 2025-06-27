import { makeDeleteOrderUseCase } from "../../../../../../application/use-cases/order/delete-order/make-delete-order-use-case"
import { makeDeleteOrderRepository } from "../../../../../../infrastructure/database/typeorm/order/delete-order-repository/make-delete-order-repository"

export const makeDeleteOrderFactory = async () => {
    const deleteOrderRepository = await makeDeleteOrderRepository()
    const useCase = makeDeleteOrderUseCase(deleteOrderRepository)
    return useCase
}
