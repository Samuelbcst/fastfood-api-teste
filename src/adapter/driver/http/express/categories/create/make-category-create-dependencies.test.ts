import { describe, it, expect, vi, beforeEach } from "vitest"
import { makeCreateCategoryFactory } from "./make-category-create-dependencies"
import { makeCreateCategoryUseCase } from "../../../../../../core/application/use-case/category/create-category/make-create-category-use-case"
import { makeCreateCategoryRepository } from "../../../../../driven/persistence/typeorm/category/create-category-repository/make-create-category-repository"

vi.mock("../../../../../../core/application/use-case/category/create-category/make-create-category-use-case", () => ({
  makeCreateCategoryUseCase: vi.fn()
}))
vi.mock("../../../../../driven/persistence/typeorm/category/create-category-repository/make-create-category-repository", () => ({
  makeCreateCategoryRepository: vi.fn()
}))

describe("makeCreateCategoryFactory", () => {
  beforeEach(() => {
    (makeCreateCategoryUseCase as any).mockReset()
    ;(makeCreateCategoryRepository as any).mockReset()
  })

  it("should create and return the use case with the repository", async () => {
    const fakeRepo = {}
    const fakeUseCase = {}
    ;(makeCreateCategoryRepository as any).mockResolvedValue(fakeRepo)
    ;(makeCreateCategoryUseCase as any).mockReturnValue(fakeUseCase)
    const result = await makeCreateCategoryFactory()
    expect(makeCreateCategoryRepository).toHaveBeenCalled()
    expect(makeCreateCategoryUseCase).toHaveBeenCalledWith(fakeRepo)
    expect(result).toBe(fakeUseCase)
  })
})

export {}
