import { z } from "zod"

const envSchema = z
    .object({
        HOST_PORT: z.string().default("3000"),
        DATABASE_USER: z.string().default("root"),
        DATABASE_PASSWORD: z.string().default("postgres"),
        DATABASE_HOST: z.string().default("postgres"),
        DATABASE_PORT: z.number().default(5432),
        DATABASE_SCHEMA: z.string().default("fastfood-api-teste"),
    })
    .parse(process.env)

export const {
    HOST_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_SCHEMA
} = envSchema
