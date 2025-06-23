import { PaymentModel } from "../model"
import { FindPaymentByIdTypeORMRepository } from "./find-payment-by-id-repository"
import dataSource from "../../"

export const makeFindPaymentByIdRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const paymentRepository = dataSource.getRepository(PaymentModel)
    return new FindPaymentByIdTypeORMRepository(paymentRepository)
}
