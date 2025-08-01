// Mock the CategoryModel import from the correct path used in delete-category-repository.ts
vi.mock("../model", () => ({
    CategoryModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { makeDeleteCategoryRepository } from "./make-delete-category-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeDeleteCategoryRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeDeleteCategoryRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
