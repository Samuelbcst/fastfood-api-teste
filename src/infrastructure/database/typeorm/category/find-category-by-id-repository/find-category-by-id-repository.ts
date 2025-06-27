import { Repository } from "typeorm"
import { Category } from "../../../../../domain/entities/category/category"
import { CategoryModel } from "../model"
import { FindCategoryByIdRepository } from "../../../../../application/repositories/category/find-category-by-id-repository"

export class FindCategoryByIdTypeORMRepository
    implements FindCategoryByIdRepository
{
    constructor(private readonly repository: Repository<CategoryModel>) {}

    execute(id: Category["id"]) {
        return this.repository.findOneBy({ id })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
