import "reflect-metadata"
import { DataSource } from "typeorm"
import { CategoryModel } from "./category/model"
import { ProductModel } from "./product/model"
import { ClientModel } from "./client/model"
import { OrderModel } from "./order/model"
import { OrderItemModel } from "./order-item/model"
import { PaymentModel } from "./payment/model"
import {
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE,
} from "../../../../env-variables"

export default new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    schema: "scaffold-schema",
    synchronize: false,
    logging: false,
    entities: [CategoryModel, ProductModel, ClientModel, OrderModel, OrderItemModel, PaymentModel],
    migrationsTableName: "version_info",
})
