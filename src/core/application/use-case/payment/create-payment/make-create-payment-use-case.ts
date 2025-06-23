import { CreatePaymentUseCase } from "."
import { CreatePaymentRepository } from "../../../port/payment/create-payment-repository"
import { FindOrderByIdRepository } from '../../../port/order/find-order-by-id-repository'

export const makeCreatePaymentUseCase = (
    paymentRepository: CreatePaymentRepository,
    orderRepository: FindOrderByIdRepository
): CreatePaymentUseCase => new CreatePaymentUseCase(paymentRepository, orderRepository)
