import { CreatePaymentUseCase } from "."
import { CreatePaymentRepository } from "../../../port/payment/create-payment-repository"

export const makeCreatePaymentUseCase = (
    repository: CreatePaymentRepository
): CreatePaymentUseCase => new CreatePaymentUseCase(repository)
