import { Order } from "../../../../domain/order"
import { RepositoryBase } from "../../repository-base"

export interface DeleteOrderRepository extends RepositoryBase<{
    id: number
}, Order | null> {}
