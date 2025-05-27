import { DataSource } from "typeorm"
import { CategoryModel } from "./category/model"
import {
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_SCHEMA,
} from "../../../../env-variables"

export const factoryDataSource = () => {
    const dataSource = new DataSource({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_SCHEMA,
        synchronize: true,
        logging: true,
        entities: [CategoryModel],
        subscribers: [],
        migrations: [],
    })
    dataSource.initialize()
    return dataSource
}
