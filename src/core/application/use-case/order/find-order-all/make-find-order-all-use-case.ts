import { FindOrderAllUseCase } from "."
import { FindOrderAllRepository } from "../../../port/order/find-order-all-repository"

export const makeFindOrderAllUseCase = (
    repository: FindOrderAllRepository
) => new FindOrderAllUseCase(repository)
