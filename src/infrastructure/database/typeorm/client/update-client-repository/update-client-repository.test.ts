// Mock the ClientModel import from the correct path used in update-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateClientTypeORMRepository } from "./update-client-repository"

const mockClient = { id: 1, name: "client", email: "client@email.com", cpf: "12345678900", updatedAt: new Date() }

describe("UpdateClientTypeORMRepository", () => {
    let repository: any
    let ormRepo: any
    let now: Date

    beforeEach(() => {
        now = new Date()
        ormRepo = {
            findOneBy: vi.fn(),
            save: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new UpdateClientTypeORMRepository(ormRepo)
    })

    it("should return null if client not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute({ id: 1, name: "new", email: "new@email.com", cpf: "999" })
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 1 })
    })

    it("should update name, email, and cpf if provided", async () => {
        const client = { ...mockClient }
        ormRepo.findOneBy.mockResolvedValue(client)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, name: "new", email: "new@email.com", cpf: "999" })
        expect(result).toEqual({ ...client, name: "new", email: "new@email.com", cpf: "999" })
        expect(ormRepo.save).toHaveBeenCalledWith({ ...client, name: "new", email: "new@email.com", cpf: "999" })
    })

    it("should only update name if email and cpf are not provided", async () => {
        const client = { ...mockClient }
        ormRepo.findOneBy.mockResolvedValue(client)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, name: "new" })
        expect(result).toEqual({ ...client, name: "new" })
        expect(ormRepo.save).toHaveBeenCalledWith({ ...client, name: "new" })
    })

    it("should only update email if name and cpf are not provided", async () => {
        const client = { ...mockClient }
        ormRepo.findOneBy.mockResolvedValue(client)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, email: "new@email.com" })
        expect(result).toEqual({ ...client, email: "new@email.com" })
        expect(ormRepo.save).toHaveBeenCalledWith({ ...client, email: "new@email.com" })
    })

    it("should only update cpf if name and email are not provided", async () => {
        const client = { ...mockClient }
        ormRepo.findOneBy.mockResolvedValue(client)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, cpf: "999" })
        expect(result).toEqual({ ...client, cpf: "999" })
        expect(ormRepo.save).toHaveBeenCalledWith({ ...client, cpf: "999" })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
