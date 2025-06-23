import { Order } from "../../../../domain/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderAllRepository
    extends RepositoryBase<void, Order[]> {}
