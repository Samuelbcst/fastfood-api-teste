import { CreatePaymentUseCase } from "."
import { CreatePaymentRepository } from "../../../ports/payment/create-payment-repository"
import { FindOrderByIdRepository } from '../../../ports/order/find-order-by-id-repository'

export const makeCreatePaymentUseCase = (
    paymentRepository: CreatePaymentRepository,
    orderRepository: FindOrderByIdRepository
): CreatePaymentUseCase => new CreatePaymentUseCase(paymentRepository, orderRepository)
