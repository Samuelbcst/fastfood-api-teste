import { describe, it, expect } from "vitest"
import type { CreateClientRepository } from "."
import type { Client } from "../../../../../core/domain/client/client"
import type { BaseEntity } from "../../../../domain/base-entity"

describe("CreateClientRepository", () => {
    it("should define a create method that returns a Client and a finish method", async () => {
        // Mock implementation
        class MockCreateClientRepository implements CreateClientRepository {
            async create(input: Omit<Client, keyof BaseEntity>): Promise<Client> {
                return {
                    id: 1,
                    ...input,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockCreateClientRepository()
        const input = { name: "Test", email: "test@example.com", cpf: "12345678900" }
        const client = await repo.create(input)
        expect(client.id).toBe(1)
        expect(client.name).toBe("Test")
        expect(client.email).toBe("test@example.com")
        expect(client.cpf).toBe("12345678900")
        expect(client.createdAt).toBeInstanceOf(Date)
        expect(client.updatedAt).toBeInstanceOf(Date)
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
