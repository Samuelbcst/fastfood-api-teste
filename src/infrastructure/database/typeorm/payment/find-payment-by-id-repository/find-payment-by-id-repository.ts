import { Repository } from "typeorm"
import { Payment } from "../../../../../domain/entities/payment/payment"
import { PaymentModel } from "../model"
import { FindPaymentByIdRepository } from "../../../../../application/repositories/payment/find-payment-by-id-repository"

export class FindPaymentByIdTypeORMRepository implements FindPaymentByIdRepository {
    constructor(private ormRepo: Repository<PaymentModel>) {}

    async execute(id: number): Promise<Payment | null> {
        const entity = await this.ormRepo.findOneBy({ id })
        return entity ? { ...entity } : null
    }

    async finish(): Promise<void> {
        // If you need to close the connection, do it here
        // await this.ormRepo.manager.connection.destroy()
    }
}
