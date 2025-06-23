import { OrderItem } from '../../../../domain/order-item/order-item'
import { RepositoryBase } from "../../repository-base"

export interface FindOrderItemAllRepository
    extends RepositoryBase<void, OrderItem[]> {}

