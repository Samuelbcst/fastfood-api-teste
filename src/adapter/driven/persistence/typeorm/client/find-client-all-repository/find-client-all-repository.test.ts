// Mock the ClientModel import from the correct path used in find-client-all-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindClientAllTypeORMRepository } from "./find-client-all-repository"

describe("FindClientAllTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            find: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindClientAllTypeORMRepository(ormRepo)
    })

    it("should return all clients", async () => {
        const mockClients = [
            { id: 1, name: "client1", email: "a@a.com", cpf: "123" },
            { id: 2, name: "client2", email: "b@b.com", cpf: "456" },
        ]
        ormRepo.find.mockResolvedValue(mockClients)
        const result = await repository.execute()
        expect(result).toEqual(mockClients)
        expect(ormRepo.find).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
