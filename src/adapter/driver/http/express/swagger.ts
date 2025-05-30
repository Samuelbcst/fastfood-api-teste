import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "Automatically generated Swagger documentation",
    },
    servers: [
        {
            url: "http://localhost:3000/api/v1",
            description: "Development server",
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: [
        "src/adapter/driver/http/express/category/index.ts",
        "dist/adapter/driver/http/express/category/index.js",
    ],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerSpec, swaggerUi }

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     DeleteCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *       required:
 *         - id
 *       description: Delete a category by id
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
