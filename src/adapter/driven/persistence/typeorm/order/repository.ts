import { Repository } from "typeorm"
import { OrderModel } from "./model"
import { Order } from "../../../../../core/domain/order"

// Define the OrderRepository interface if it does not exist in the imported module
export interface OrderRepository {
    findById(id: Order["id"]): Promise<OrderModel | null>;
    findFirst(props: Partial<OrderModel>): Promise<OrderModel | null>;
    findAll(props: Partial<OrderModel>): Promise<OrderModel[]>;
    insertAndSave(props: OrderModel): Promise<OrderModel>;
    patch(entity: OrderModel): Promise<OrderModel>;
    removeById(id: OrderModel["id"]): Promise<void>;
}

export class OrderTypeORMRepository implements OrderRepository {
    constructor(private readonly repository: Repository<OrderModel>) {}

    findById(id: Order["id"]) {
        return this.repository.findOneBy({ id })
    }

    findFirst(props: Partial<Order>) {
        return this.repository.findOne({ where: props })
    }

    findAll(props: Partial<Order>) {
        return this.repository.find({ where: props })
    }

    insertAndSave(props: Order) {
        const order = this.repository.create(props)
        return this.repository.save(order)
    }

    patch(entity: Order) {
        return this.repository.save(entity)
    }

    async removeById(id: Order["id"]) {
        await this.repository.delete({ id })
    }
}
