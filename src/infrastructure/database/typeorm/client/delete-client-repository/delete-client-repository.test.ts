// Mock the ClientModel import from the correct path used in delete-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteClientTypeORMRepository } from "./delete-client-repository"

const mockClient = { id: 1, name: "client", email: "client@email.com", cpf: "12345678900" }

describe("DeleteClientTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOneBy: vi.fn(),
            remove: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new DeleteClientTypeORMRepository(ormRepo)
    })

    it("should return null if client not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute({ id: 1 })
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 1 })
    })

    it("should remove and return the client if found", async () => {
        ormRepo.findOneBy.mockResolvedValue(mockClient)
        ormRepo.remove.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1 })
        expect(result).toEqual(mockClient)
        expect(ormRepo.remove).toHaveBeenCalledWith(mockClient)
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
