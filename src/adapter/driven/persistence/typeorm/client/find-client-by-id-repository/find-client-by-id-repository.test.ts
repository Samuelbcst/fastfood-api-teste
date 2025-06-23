// Mock the ClientModel import from the correct path used in find-client-by-id-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindClientByIdTypeORMRepository } from "./find-client-by-id-repository"

const mockClient = { id: 1, name: "client", email: "client@email.com", cpf: "12345678900" }

describe("FindClientByIdTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOneBy: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindClientByIdTypeORMRepository(ormRepo)
    })

    it("should return the client if found", async () => {
        ormRepo.findOneBy.mockResolvedValue(mockClient)
        const result = await repository.execute(1)
        expect(result).toEqual(mockClient)
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 1 })
    })

    it("should return null if not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute(2)
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 2 })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
