import { Repository } from "typeorm"
import { Category } from "../../../../../../core/domain/category"
import { CategoryModel } from "../model"
import { FindCategoryByIdRepository } from "../../../../../../core/application/port/category/find-category-by-id-repository"

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
