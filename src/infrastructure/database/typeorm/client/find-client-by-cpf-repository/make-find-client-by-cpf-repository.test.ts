// Mock the ClientModel import from the correct path used in find-client-by-cpf-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeFindClientByCpfRepository } from "./make-find-client-by-cpf-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeFindClientByCpfRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeFindClientByCpfRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
