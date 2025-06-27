import { OrderItem } from "../../../../domain/entities/order-item/order-item"
import { RepositoryBase } from "../../repository-base"

export interface DeleteOrderItemRepository extends RepositoryBase<{
    id: number
}, OrderItem | null> {}
