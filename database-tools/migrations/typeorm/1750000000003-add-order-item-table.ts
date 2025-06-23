import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class AddOrderItemTable1750000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_item",
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
                        name: "orderId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "productId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "productName",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "unitPrice",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "quantity",
                        type: "int",
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
                ],
            })
        )
        await queryRunner.createForeignKeys(
            "scaffold-schema.order_item",
            [
                new TableForeignKey({
                    columnNames: ["orderId"],
                    referencedTableName: "scaffold-schema.order",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }),
                new TableForeignKey({
                    columnNames: ["productId"],
                    referencedTableName: "scaffold-schema.product",
                    referencedColumnNames: ["id"],
                    onDelete: "RESTRICT",
                    onUpdate: "CASCADE",
                })
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scaffold-schema.order_item")
    }
}
