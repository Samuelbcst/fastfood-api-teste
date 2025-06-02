import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class AddPaymentTable1750000000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment",
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
                        name: "paymentStatus",
                        type: "varchar",
                        length: "16",
                        isNullable: false,
                        default: "'NOT_PAID'",
                    },
                    {
                        name: "paidAt",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        )
        await queryRunner.createForeignKey(
            "scaffold-schema.payment",
            new TableForeignKey({
                columnNames: ["orderId"],
                referencedTableName: "scaffold-schema.order",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scaffold-schema.payment")
    }
}
