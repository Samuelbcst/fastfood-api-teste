import { Payment } from "../../../../domain/payment"
import { RepositoryBase } from "../../repository-base"

export interface FindPaymentByIdRepository extends RepositoryBase<number, Payment | null> {}
