import { describe, it, expect } from "vitest"
import type { UpdateClientRepository } from "."
import type { Client } from "../../../../domain/entities/client/client"

describe("UpdateClientRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, updating and returning a Client or null", async () => {
        // Mock implementation
        class MockUpdateClientRepository implements UpdateClientRepository {
            async execute(param: { id: number; name?: string; email?: string; cpf?: string }): Promise<Client | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        name: param.name ?? "Client1",
                        email: param.email ?? "client1@example.com",
                        cpf: param.cpf ?? "12345678900",
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
        const repo = new MockUpdateClientRepository()
        const updated = await repo.execute({ id: 1, name: "UpdatedClient", email: "updated@example.com", cpf: "11122233344" })
        expect(updated).toBeDefined()
        expect(updated?.id).toBe(1)
        expect(updated?.name).toBe("UpdatedClient")
        expect(updated?.email).toBe("updated@example.com")
        expect(updated?.cpf).toBe("11122233344")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
