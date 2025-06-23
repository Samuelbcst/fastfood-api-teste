import { makeFindOrderByStatusUseCase } from "../../../../../../core/application/use-case/order/find-order-by-status/make-find-order-by-status-use-case"
import { makeFindOrderByStatusRepository } from "../../../../../driven/persistence/typeorm/order/find-order-by-status-repository/make-find-order-by-status-repository"

export const makeGetOrderByStatusFactory = async () => {
    const repository = await makeFindOrderByStatusRepository()
    const useCase = makeFindOrderByStatusUseCase(repository)
    return useCase
}
 