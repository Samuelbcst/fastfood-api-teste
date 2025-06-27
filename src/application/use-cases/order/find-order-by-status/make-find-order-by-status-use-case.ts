import { FindOrderByStatusUseCase } from "."
import { FindOrderByStatusRepository } from "../../../repositories/order/find-order-by-status-repository"

export const makeFindOrderByStatusUseCase = (
    repository: FindOrderByStatusRepository
) => new FindOrderByStatusUseCase(repository)
