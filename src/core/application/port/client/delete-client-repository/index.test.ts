import { describe, it, expect } from "vitest"
import type { DeleteClientRepository } from "."
import type { Client } from "../../../../domain/client/client"

describe("DeleteClientRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning a Client or null", async () => {
        // Mock implementation
        class MockDeleteClientRepository implements DeleteClientRepository {
            async execute(param: { id: number }): Promise<Client | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        name: "TestClient",
                        email: "test@example.com",
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
        const repo = new MockDeleteClientRepository()
        const found = await repo.execute({ id: 1 })
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.name).toBe("TestClient")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
