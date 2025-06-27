import { Order } from "../../../../domain/entities/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByIdRepository
    extends RepositoryBase<number, Order | null> {}
