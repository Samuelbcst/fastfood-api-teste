import { makeCreateOrderUseCase } from "../../../../../../core/application/use-case/order/create-order/make-create-order-use-case"
import { makeCreateOrderRepository } from "../../../../../driven/persistence/typeorm/order/create-order-repository/make-create-order-repository"

export const makeCreateOrderFactory = async () => {
    const repository = await makeCreateOrderRepository()
    const useCase = makeCreateOrderUseCase(repository)
    return useCase
}
