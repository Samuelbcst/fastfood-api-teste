import { OrderItem } from "../../../../domain/order-item/order-item"
import { RepositoryBase } from "../../repository-base"

export interface DeleteOrderItemRepository extends RepositoryBase<{
    id: number
}, OrderItem | null> {}
