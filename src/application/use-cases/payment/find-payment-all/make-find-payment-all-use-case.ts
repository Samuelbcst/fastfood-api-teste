import { FindPaymentAllRepository } from "../../../ports/payment/find-payment-all-repository"
import { FindPaymentAllUseCase } from "."

export const makeFindPaymentAllUseCase = (
    repository: FindPaymentAllRepository
) => new FindPaymentAllUseCase(repository)
