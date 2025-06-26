// Mock the CategoryModel import from the correct path used in update-category-repository.ts
vi.mock("../model", () => ({
    CategoryModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeUpdateCategoryRepository } from "./make-update-category-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeUpdateCategoryRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeUpdateCategoryRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
