import { Payment } from "../../../../domain/payment/payment"
import { RepositoryBase } from "../../repository-base"

export interface UpdatePaymentRepository extends RepositoryBase<{
    id: number
    // Add other updatable fields as needed
    amount?: number
    status?: string
    // ...
}, Payment | null> {}
