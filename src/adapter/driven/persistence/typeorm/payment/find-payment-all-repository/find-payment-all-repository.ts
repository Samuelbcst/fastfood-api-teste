import { Repository } from "typeorm"
import { Payment } from "../../../../../../core/domain/payment/payment"
import { PaymentModel } from "../model"
import { FindPaymentAllRepository } from "../../../../../../core/application/port/payment/find-payment-all-repository"

export class FindPaymentAllTypeORMRepository
    implements FindPaymentAllRepository
{
    constructor(private readonly repository: Repository<PaymentModel>) {}

    execute(): Promise<Payment[]> {
        return this.repository.find()
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
