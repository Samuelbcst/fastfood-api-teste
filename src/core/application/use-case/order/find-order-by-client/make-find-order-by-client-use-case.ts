import { FindOrderByClientUseCase } from "."
import { FindOrderByClientRepository } from "../../../port/order/find-order-by-client-repository"

export const makeFindOrderByClientUseCase = (
    repository: FindOrderByClientRepository
) => new FindOrderByClientUseCase(repository)
