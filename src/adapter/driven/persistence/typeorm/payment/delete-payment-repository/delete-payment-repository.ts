import { Repository } from "typeorm"
import { Payment } from "../../../../../../core/domain/payment"
import { PaymentModel } from "../model"
import { DeletePaymentRepository } from "../../../../../../core/application/port/payment/delete-payment-repository"

export class DeletePaymentTypeORMRepository implements DeletePaymentRepository {
    constructor(private readonly repository: Repository<PaymentModel>) {}

    async execute(param: { id: Payment["id"] }): Promise<Payment | null> {
        const { id } = param;
        const payment = await this.repository.findOneBy({ id });
        if (!payment) return null;
        await this.repository.remove(payment);
        return payment;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
