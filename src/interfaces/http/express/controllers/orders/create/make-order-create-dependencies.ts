import { makeCreateOrderUseCase } from "../../../../../../application/use-cases/order/create-order/make-create-order-use-case"
import { makeCreateOrderRepository } from "../../../../../../infrastructure/database/typeorm/order/create-order-repository/make-create-order-repository"

export const makeCreateOrderFactory = async () => {
    const repository = await makeCreateOrderRepository()
    const useCase = makeCreateOrderUseCase(repository)
    return useCase
}
