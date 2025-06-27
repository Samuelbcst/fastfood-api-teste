import { describe, it, expect } from "vitest"
import type { FindClientAllRepository } from "."
import type { Client } from "../../../../domain/entities/client/client"

describe("FindClientAllRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of Client", async () => {
        // Mock implementation
        class MockFindClientAllRepository implements FindClientAllRepository {
            async execute(): Promise<Client[]> {
                return [
                    {
                        id: 1,
                        name: "Client1",
                        email: "client1@example.com",
                        cpf: "12345678900",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 2,
                        name: "Client2",
                        email: "client2@example.com",
                        cpf: "98765432100",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindClientAllRepository()
        const clients = await repo.execute()
        expect(Array.isArray(clients)).toBe(true)
        expect(clients.length).toBe(2)
        expect(clients[0].name).toBe("Client1")
        expect(clients[1].cpf).toBe("98765432100")
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
