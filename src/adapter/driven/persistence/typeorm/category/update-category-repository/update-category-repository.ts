import { Repository } from "typeorm"
import { Category } from "../../../../../../core/domain/category"
import { CategoryModel } from "../model"
import { UpdateCategoryRepository } from "../../../../../../core/application/port/category/update-category-repository"

export class UpdateCategoryTypeORMRepository
    implements UpdateCategoryRepository
{
    constructor(private readonly repository: Repository<CategoryModel>) {}

    async execute(param: { id: Category["id"]; name?: Category["name"]; description?: Category["description"] }): Promise<Category | null> {
        const { id, name, description } = param;        
        const category = await this.repository.findOneBy({ id });
        if (!category) return null;
        if (name !== undefined) category.name = name;
        if (description !== undefined) category.description = description;
        category.updatedAt = new Date();
        await this.repository.save(category);
        return category;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
