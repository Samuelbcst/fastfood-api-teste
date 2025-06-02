import { makeUpdateOrderUseCase } from "../../../../../../core/application/use-case/order/update-order/make-update-order-use-case"
import { makeUpdateOrderRepository } from "../../../../../driven/persistence/typeorm/order/update-order-repository/make-update-order-repository"

export const makeUpdateOrderFactory = async () => {
    const updateOrderRepository = await makeUpdateOrderRepository()
    const useCase = makeUpdateOrderUseCase(updateOrderRepository)
    return useCase
}
