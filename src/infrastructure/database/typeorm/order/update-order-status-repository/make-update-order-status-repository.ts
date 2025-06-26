import { OrderModel } from "../model";
import { TypeOrmUpdateOrderStatusRepository } from "./update-order-status-repository";
import dataSource from "../..";

export const makeUpdateOrderStatusRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const orderRepository = dataSource.getRepository(OrderModel);
    return new TypeOrmUpdateOrderStatusRepository(orderRepository);
};
