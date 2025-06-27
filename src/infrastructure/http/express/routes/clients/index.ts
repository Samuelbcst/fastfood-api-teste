import { runExpressEndpoint } from "../../helpers/run-express-endpoint"
import { Router } from "express"
import { getClientById } from "./get-by-id"
import { getClientAll } from "./get-all"
import { createClient } from "./create"
import { updateClient } from "./update"
import { deleteClient } from "./delete"
import { getClientByCpf } from "./get-by-cpf"


const clientRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: client
 *     description: Operations about clients
 */

/**
 * @openapi
 * /clients:
 *   get:
 *     tags:
 *       - client
 *     summary: Get all clients
 *     responses:
 *       200:
 *         description: A list of clients.
 */
clientRouter.get("/", runExpressEndpoint(getClientAll, "get"))

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     tags:
 *       - client
 *     summary: Get client by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: A client object.
 *          404:
 *              description: Client not found.
 */
clientRouter.get("/:id", runExpressEndpoint(getClientById, "get"))

/**
 * @openapi
 * /clients/cpf/{cpf}:
 *   get:
 *     tags:
 *       - client
 *     summary: Get client by CPF
 *     parameters:
 *        - name: cpf
 *          in: path
 *          required: true
 *          schema:
 *              type: string
 *     responses:
 *          200:
 *              description: A client object.
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Client'
 *          404:
 *              description: Client not found.
 */
clientRouter.get("/cpf/:cpf", runExpressEndpoint(getClientByCpf, "get"))

/**
 * @openapi
 * /clients:
 *   post:
 *     tags:
 *       - client
 *     summary: Create a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name
 *               email:
 *                 type: string
 *                 description: email
 *               cpf:
 *                 type: string
 *                 description: CPF
 *             required:
 *               - name
 *               - email
 *               - cpf
 *     responses:
 *       201:
 *         description: Client created.
 *       400:
 *         description: Invalid input.
 */
clientRouter.post("/", runExpressEndpoint(createClient, "post"))

/**
 * @openapi
 * /clients/{id}:
 *   put:
 *     tags:
 *       - client
 *     summary: Update an existing client
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Client not found.
 */
clientRouter.put("/:id", runExpressEndpoint(updateClient, "put"))

/**
 * @openapi
 * /clients/{id}:
 *   delete:
 *     tags:
 *       - client
 *     summary: Delete a client
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Client deleted.
 *       404:
 *         description: Client not found.
 */
clientRouter.delete("/:id", runExpressEndpoint(deleteClient, "delete"))

export default clientRouter
