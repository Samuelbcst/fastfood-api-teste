import { Order } from "../../../../domain/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByIdRepository
    extends RepositoryBase<number, Order | null> {}
