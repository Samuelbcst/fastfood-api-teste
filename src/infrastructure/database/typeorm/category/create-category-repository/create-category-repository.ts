import { Repository } from "typeorm/repository/Repository"
import { CreateCategoryRepository } from "../../../../../application/repositories/category/create-category-repository"
import { BaseEntity } from "../../../../../domain/entities/base-entity"
import { Category } from "../../../../../domain/entities/category/category"
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
