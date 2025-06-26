import { describe, it, expect } from "vitest"
import type { FindCategoryAllRepository } from "."
import type { Category } from "../../../../domain/entities/category/category"

describe("FindCategoryAllRepository", () => {
    it("should implement execute and finish methods from RepositoryBase, returning an array of Category", async () => {
        // Mock implementation
        class MockFindCategoryAllRepository implements FindCategoryAllRepository {
            async execute(): Promise<Category[]> {
                return [
                    {
                        id: 1,
                        name: "Cat1",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 2,
                        name: "Cat2",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new MockFindCategoryAllRepository()
        const categories = await repo.execute()
        expect(Array.isArray(categories)).toBe(true)
        expect(categories.length).toBe(2)
        expect(categories[0].name).toBe("Cat1")
        expect(categories[1].name).toBe("Cat2")
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
