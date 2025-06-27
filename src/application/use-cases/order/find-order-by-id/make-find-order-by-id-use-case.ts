import { FindOrderByIdUseCase } from "."
import { FindOrderByIdRepository } from "../../../repositories/order/find-order-by-id-repository"

export const makeFindOrderByIdUseCase = (
    repository: FindOrderByIdRepository
) => new FindOrderByIdUseCase(repository)
