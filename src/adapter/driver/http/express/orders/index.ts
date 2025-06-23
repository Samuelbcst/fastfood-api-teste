import { runExpressEndpoint } from "../generic/run-express-endpoint"
import { Router } from "express"
import { getOrderById } from "./get-by-id"
import { getOrderAll } from "./get-all"
import { createOrder } from "./create"
import { updateOrder } from "./update"
import { deleteOrder } from "./delete"
import { getOrderByClient } from "./get-by-client"
import { getOrderByStatus } from "./get-by-status"
import { updateOrderStatus } from "./update-status"

const orderRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: order
 *     description: Operations about orders
 */

/**
 * @openapi
 * /orders:
 *   get:
 *     tags:
 *       - order
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders.
 */
orderRouter.get("/", runExpressEndpoint(getOrderAll, "get"))

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags:
 *       - order
 *     summary: Get order by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: An order.
 *          404:
 *              description: Order not found.
 */
orderRouter.get("/:id", runExpressEndpoint(getOrderById, "get"))

/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *       - order
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: number
 *                 required: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                   required:
 *                     - productId
 *                     - quantity
 *     responses:
 *       201:
 *         description: Order created.
 *       400:
 *         description: Invalid input.
 */
orderRouter.post("/", runExpressEndpoint(createOrder, "post"))

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     tags:
 *       - order
 *     summary: Update an existing order
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
 *               clientId:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                   required:
 *                     - productId
 *                     - quantity
 *     responses:
 *       200:
 *         description: Order updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Order not found.
 */
orderRouter.put("/:id", runExpressEndpoint(updateOrder, "put"))

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - order
 *     summary: Delete an order
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Order deleted.
 *       404:
 *         description: Order not found.
 */
orderRouter.delete("/:id", runExpressEndpoint(deleteOrder, "delete"))

/**
 * @openapi
 * /orders/client/{clientId}:
 *   get:
 *     tags:
 *       - order
 *     summary: Get orders by client
 *     parameters:
 *        - name: clientId
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: A list of orders for the client.
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Order'
 *          404:
 *              description: No orders found for this client.
 */
orderRouter.get("/client/:clientId", runExpressEndpoint(getOrderByClient, "get"))

/**
 * @swagger
 * /orders/{id}/status:
 *   get:
 *     tags:
 *       - order
 *     summary: Get order status by order ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: The status of the order.
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *          404:
 *              description: Order not found.
 */
orderRouter.get("/:id/status", runExpressEndpoint(getOrderByStatus, "get"))

/**
 * @openapi
 * /orders/{id}/status:
 *   put:
 *     tags:
 *       - order
 *     summary: Update order status by order ID
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
 *               status:
 *                 type: string
 *                 enum: [pending, processing, completed, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated.
 *       400:
 *         description: Invalid status value.
 *       404:
 *         description: Order not found.
 */
orderRouter.put("/:id/status", runExpressEndpoint(updateOrderStatus, "put"))

export default orderRouter
