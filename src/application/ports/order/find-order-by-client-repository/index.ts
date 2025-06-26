import { Order } from "../../../../domain/entities/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByClientRepository
    extends RepositoryBase<number, Order[] | null> {}
