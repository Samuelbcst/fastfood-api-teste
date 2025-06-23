// Mock the ClientModel import from the correct path used in find-client-by-cpf-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindClientByCpfTypeORMRepository } from "./find-client-by-cpf-repository"

const mockClient = { id: 1, name: "client", email: "client@email.com", cpf: "12345678900" }

describe("FindClientByCpfTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOneBy: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindClientByCpfTypeORMRepository(ormRepo)
    })

    it("should return the client if found", async () => {
        ormRepo.findOneBy.mockResolvedValue(mockClient)
        const result = await repository.execute("12345678900")
        expect(result).toEqual(mockClient)
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ cpf: "12345678900" })
    })

    it("should return null if not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute("notfound")
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ cpf: "notfound" })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
