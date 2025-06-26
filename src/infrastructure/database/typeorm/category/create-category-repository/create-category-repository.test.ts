// Mock the CategoryModel import from the correct path used in create-category-repository.ts
vi.mock("../model", () => ({
    CategoryModel: {
        create: vi.fn(),
    },
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmCreateCategoryRepository } from "./create-category-repository"

const mockCategory = { name: "cat", description: "desc" }

describe("TypeOrmCreateCategoryRepository", () => {
    let repository: any
    let ormRepo: any
    let CategoryModel: any

    beforeEach(async () => {
        ormRepo = {
            manager: { connection: { destroy: vi.fn() } },
        }
        // Dynamically import the mocked module
        CategoryModel = (await vi.importMock("../model")).CategoryModel
        repository = new TypeOrmCreateCategoryRepository(ormRepo)
    })

    it("should create and save a category", async () => {
        const save = vi.fn().mockResolvedValue(undefined)
        CategoryModel.create.mockReturnValue({ ...mockCategory, save })
        await repository.create(mockCategory)
        expect(CategoryModel.create).toHaveBeenCalledWith(mockCategory)
        expect(save).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})
