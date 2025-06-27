import { FindPaymentByIdUseCase } from "."
import { FindPaymentByIdRepository } from "../../../repositories/payment/find-payment-by-id-repository"

export const makeFindPaymentByIdUseCase = (
    repository: FindPaymentByIdRepository
) => new FindPaymentByIdUseCase(repository)
