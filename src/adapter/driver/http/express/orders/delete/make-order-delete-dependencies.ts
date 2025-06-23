import { makeDeleteOrderUseCase } from "../../../../../../core/application/use-case/order/delete-order/make-delete-order-use-case"
import { makeDeleteOrderRepository } from "../../../../../driven/persistence/typeorm/order/delete-order-repository/make-delete-order-repository"

export const makeDeleteOrderFactory = async () => {
    const deleteOrderRepository = await makeDeleteOrderRepository()
    const useCase = makeDeleteOrderUseCase(deleteOrderRepository)
    return useCase
}
