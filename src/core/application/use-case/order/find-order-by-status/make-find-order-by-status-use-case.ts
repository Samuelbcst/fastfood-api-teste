import { FindOrderByStatusUseCase } from "."
import { FindOrderByStatusRepository } from "../../../port/order/find-order-by-status-repository"

export const makeFindOrderByStatusUseCase = (
    repository: FindOrderByStatusRepository
) => new FindOrderByStatusUseCase(repository)
