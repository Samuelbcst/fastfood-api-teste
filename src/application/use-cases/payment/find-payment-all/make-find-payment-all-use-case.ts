import { FindPaymentAllRepository } from "../../../repositories/payment/find-payment-all-repository"
import { FindPaymentAllUseCase } from "."

export const makeFindPaymentAllUseCase = (
    repository: FindPaymentAllRepository
) => new FindPaymentAllUseCase(repository)
