// Mock the ClientModel import from the correct path used in create-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {
        create: vi.fn(),
    },
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmCreateClientRepository } from "./create-client-repository"

const mockClient = { name: "client", email: "client@email.com", cpf: "12345678900" }

describe("TypeOrmCreateClientRepository", () => {
    let repository: any
    let ormRepo: any
    let ClientModel: any

    beforeEach(async () => {
        ormRepo = {
            manager: { connection: { destroy: vi.fn() } },
        }
        ClientModel = (await vi.importMock("../model")).ClientModel
        repository = new TypeOrmCreateClientRepository(ormRepo)
    })

    it("should create and save a client", async () => {
        const save = vi.fn().mockResolvedValue(undefined)
        ClientModel.create.mockReturnValue({ ...mockClient, save })
        await repository.create(mockClient)
        expect(ClientModel.create).toHaveBeenCalledWith(mockClient)
        expect(save).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
