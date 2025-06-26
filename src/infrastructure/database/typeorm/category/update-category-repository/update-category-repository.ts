import { Repository } from "typeorm"
import { Category } from "../../../../../domain/entities/category/category"
import { CategoryModel } from "../model"
import { UpdateCategoryRepository } from "../../../../../application/ports/category/update-category-repository"

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
