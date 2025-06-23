import { describe, it, expect } from "vitest"
import type { FindCategoryByIdRepository } from "."
import type { Category } from "../../../../domain/category/category"

describe("FindCategoryByIdRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning a Category or null", async () => {
        // Mock implementation
        class MockFindCategoryByIdRepository implements FindCategoryByIdRepository {
            async execute(id: number): Promise<Category | null> {
                if (id === 1) {
                    return {
                        id: 1,
                        name: "Cat1",
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
        const repo = new MockFindCategoryByIdRepository()
        const found = await repo.execute(1)
        expect(found).toBeDefined()
        expect(found?.id).toBe(1)
        expect(found?.name).toBe("Cat1")
        const notFound = await repo.execute(2)
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
