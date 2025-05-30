import "reflect-metadata"
import { DataSource } from "typeorm"
import { CategoryModel } from "./category/model"
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
    synchronize: true,
    logging: false,
    entities: [CategoryModel],
    subscribers: [],
    migrations: ["database-tools/migrations/typeorm/*.ts"],
    migrationsTableName: "version_info",
})
