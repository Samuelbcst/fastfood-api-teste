// Mock the CategoryModel import from the correct path used in find-category-all-repository.ts
vi.mock("../model", () => ({
    CategoryModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindCategoryAllTypeORMRepository } from "./find-category-all-repository"

describe("FindCategoryAllTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            find: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindCategoryAllTypeORMRepository(ormRepo)
    })

    it("should return all categories", async () => {
        const mockCategories = [
            { id: 1, name: "cat1", description: "desc1" },
            { id: 2, name: "cat2", description: "desc2" },
        ]
        ormRepo.find.mockResolvedValue(mockCategories)
        const result = await repository.execute()
        expect(result).toEqual(mockCategories)
        expect(ormRepo.find).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
