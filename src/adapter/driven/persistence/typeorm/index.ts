import "reflect-metadata"
import { DataSource } from "typeorm"
import { CategoryModel } from "./category/model"
import { ProductModel } from "./product/model"
import { ClientModel } from "./client/model"
import {
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE,
} from "../../../../env-variables"

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    schema: "scaffold-schema",
    synchronize: true,
    logging: false,
    entities: [CategoryModel, ProductModel, ClientModel],
    subscribers: [],
    migrations: [`database-tools/migrations/typeorm/*.${isProduction ? 'js' : 'ts'}`],
    migrationsTableName: "version_info",
})
