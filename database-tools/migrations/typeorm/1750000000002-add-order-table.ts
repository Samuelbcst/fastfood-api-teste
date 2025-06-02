import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class AddOrderTable1750000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order",
                schema: "scaffold-schema",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "clientId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "totalAmount",
                        type: "float",
                        isNullable: false,
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
                    {
                        name: "status",
                        type: "varchar",
                        length: "32",
                        isNullable: false,
                        default: "'RECEIVED'",
                    },
                    {
                        name: "statusUpdatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                    {
                        name: "pickupCode",
                        type: "varchar",
                        length: "16",
                        isNullable: true,
                    },
                ],
            })
        )
        await queryRunner.createForeignKey(
            "scaffold-schema.order",
            new TableForeignKey({
                columnNames: ["clientId"],
                referencedTableName: "scaffold-schema.client",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scaffold-schema.order")
    }
}
