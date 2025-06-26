// Mock the ClientModel import from the correct path used in update-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeUpdateClientRepository } from "./make-update-client-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeUpdateClientRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeUpdateClientRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
