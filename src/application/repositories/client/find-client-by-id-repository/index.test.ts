import { describe, it, expect } from "vitest"
import type { FindClientByIdRepository } from "."
import type { Client } from "../../../../domain/entities/client/client"

describe("FindClientByIdRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning a Client or null", async () => {
        // Mock implementation
        class MockFindClientByIdRepository implements FindClientByIdRepository {
            async execute(id: number): Promise<Client | null> {
                if (id === 1) {
                    return {
                        id: 1,
                        name: "Client1",
                        email: "client1@example.com",
                        cpf: "12345678900",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindClientByIdRepository()
        const found = await repo.execute(1)
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.name).toBe("Client1")
        const notFound = await repo.execute(2)
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
