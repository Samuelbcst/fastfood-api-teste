import { describe, it, expect } from "vitest"
import type { RepositoryBase } from "./repository-base"
import type { BaseEntity } from "../../domain/entities/base-entity"

describe("RepositoryBase", () => {
    it("should define an interface with execute and finish methods", async () => {
        // Create a mock entity
        interface TestEntity extends BaseEntity {
            value: string
        }
        // Create a mock repository implementing RepositoryBase
        class TestRepository implements RepositoryBase<{ id: number }, TestEntity | null> {
            async execute(param: { id: number }): Promise<TestEntity | null> {
                if (param.id === 1) {
                    return { id: 1, value: "foo", createdAt: new Date(), updatedAt: new Date() }
                }
                return null
            }
            async finish(): Promise<void> {
                // no-op
            }
        }
        const repo = new TestRepository()
        const entity = await repo.execute({ id: 1 })
        expect(entity).toBeDefined()
        expect(entity?.id).toBe(1)
        expect(entity?.value).toBe("foo")
        const notFound = await repo.execute({ id: 2 })
        expect(notFound).toBeNull()
        await expect(repo.finish()).resolves.toBeUndefined()
    })
})
