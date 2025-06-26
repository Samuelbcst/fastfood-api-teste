import { describe, it, expect } from "vitest"
import type { FindClientByCpfRepository } from "."
import type { Client } from "../../../../domain/entities/client/client"

describe("FindClientByCpfRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning a Client or null", async () => {
        // Mock implementation
        class MockFindClientByCpfRepository implements FindClientByCpfRepository {
            async execute(cpf: string): Promise<Client | null> {
                if (cpf === "12345678900") {
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
        const repo = new MockFindClientByCpfRepository()
        const found = await repo.execute("12345678900")
        expect(found).toBeDefined()
        expect(found?.cpf).toBe("12345678900")
        const notFound = await repo.execute("00000000000")
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
