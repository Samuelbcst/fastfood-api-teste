// Mock the ClientModel import from the correct path used in create-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeCreateClientRepository } from "./make-create-client-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeCreateClientRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeCreateClientRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.create).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
