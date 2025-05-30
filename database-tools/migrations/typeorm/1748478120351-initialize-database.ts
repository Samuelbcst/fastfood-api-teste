import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class InitializeDatabase1748478120351 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                ],
                schema: "scaffold-schema",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scaffold-schema.category")
        await queryRunner.dropSchema("scaffold-schema", true)
    }
}
