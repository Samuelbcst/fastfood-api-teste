import { makeFindOrderByClientUseCase } from "../../../../../../application/use-cases/order/find-order-by-client/make-find-order-by-client-use-case"
import { makeFindOrderByClientRepository } from "../../../../../../infrastructure/database/typeorm/order/find-order-by-client-repository/make-find-order-by-client-repository"

export const makeGetOrderByClientFactory = async () => {
    const repository = await makeFindOrderByClientRepository()
    const useCase = makeFindOrderByClientUseCase(repository)
    return useCase
}
 