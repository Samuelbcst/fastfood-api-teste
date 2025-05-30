import { Repository } from "typeorm"
import { Category } from "../../../../../../core/domain/category"
import { CategoryModel } from "../model"
import { FindCategoryAllRepository } from "../../../../../../core/application/port/category/find-category-all-repository"

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
