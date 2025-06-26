import { makeUpdateOrderUseCase } from "../../../../../../application/use-cases/order/update-order/make-update-order-use-case"
import { makeUpdateOrderRepository } from "../../../../../../infrastructure/database/typeorm/order/update-order-repository/make-update-order-repository"

export const makeUpdateOrderFactory = async () => {
    const updateOrderRepository = await makeUpdateOrderRepository()
    const useCase = makeUpdateOrderUseCase(updateOrderRepository)
    return useCase
}
