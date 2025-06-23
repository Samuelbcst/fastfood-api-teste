import { describe, it, expect } from "vitest"
import type { DeleteCategoryRepository } from "."
import type { Category } from "../../../../domain/category/category"
import type { BaseEntity } from "../../../../domain/base-entity"

describe("DeleteCategoryRepository", () => {
    it("should implement execute and finish methods from RepositoryBase", async () => {
        // Mock implementation
        class MockDeleteCategoryRepository implements DeleteCategoryRepository {
            async execute(param: { id: number }): Promise<Category | null> {
                if (param.id === 1) {
                    return {
                        id: 1,
                        name: "TestCat",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockDeleteCategoryRepository()
        const found = await repo.execute({ id: 1 })
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.name).toBe("TestCat")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
