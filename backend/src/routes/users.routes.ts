import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/users.controller";
import { authenticateJWT } from "../middleware/auth";

const router = Router();
router.use(authenticateJWT);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   email: { type: string }
 *                   firstName: { type: string }
 *                   lastName: { type: string }
 *                   role: { type: string }
 */

router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 email: { type: string }
 *                 firstName: { type: string }
 *                 lastName: { type: string }
 *                 role: { type: string }
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

export default router;
