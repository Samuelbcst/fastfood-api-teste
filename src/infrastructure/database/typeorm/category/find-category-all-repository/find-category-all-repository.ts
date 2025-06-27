import { Repository } from "typeorm"
import { Category } from "../../../../../domain/entities/category/category"
import { CategoryModel } from "../model"
import { FindCategoryAllRepository } from "../../../../../application/repositories/category/find-category-all-repository"

export class FindCategoryAllTypeORMRepository
    implements FindCategoryAllRepository
{
    constructor(private readonly repository: Repository<CategoryModel>) {}

    execute(): Promise<Category[]> {
        return this.repository.find()
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
