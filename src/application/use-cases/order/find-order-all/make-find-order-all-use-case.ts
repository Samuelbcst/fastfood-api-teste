import { FindOrderAllUseCase } from "."
import { FindOrderAllRepository } from "../../../ports/order/find-order-all-repository"

export const makeFindOrderAllUseCase = (
    repository: FindOrderAllRepository
) => new FindOrderAllUseCase(repository)
