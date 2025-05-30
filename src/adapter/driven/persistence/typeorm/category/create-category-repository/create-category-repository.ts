import { Repository } from "typeorm/repository/Repository"
import { CreateCategoryRepository } from "../../../../../../core/application/port/category/create-category-repository"
import { BaseEntity } from "../../../../../../core/domain/base-entity"
import { Category } from "../../../../../../core/domain/category"
import { CategoryModel } from "../model"

export class TypeOrmCreateCategoryRepository
    implements CreateCategoryRepository
{
    constructor(private readonly repository: Repository<CategoryModel>) {}

    async create({ name, description }: Omit<Category, keyof BaseEntity>) {
        const category = CategoryModel.create({ name, description })
        await category.save()
        return category
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
