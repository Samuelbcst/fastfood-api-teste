import { PaymentModel } from "../model"
import { TypeOrmCreatePaymentRepository } from "./create-payment-repository"
import dataSource from "../../"

export const makeCreatePaymentRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const paymentRepository = dataSource.getRepository(PaymentModel)
    return new TypeOrmCreatePaymentRepository(paymentRepository)
}
