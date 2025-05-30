import { describe, it, expect } from "vitest"
import { Category } from "./category"

describe("Category", () => {
    it("should have id, name, createdAt, updatedAt", () => {
        const now = new Date()
        const category: Category = {
            id: 1,
            name: "Books",
            createdAt: now,
            updatedAt: now,
        }
        expect(category.id).toBe(1)
        expect(category.name).toBe("Books")
        expect(category.createdAt).toBe(now)
        expect(category.updatedAt).toBe(now)
    })

    it("should allow optional description", () => {
        const now = new Date()
        const category: Category = {
            id: 2,
            name: "Movies",
            createdAt: now,
            updatedAt: now,
        }
        expect(category.description).toBeUndefined()
    })
})
