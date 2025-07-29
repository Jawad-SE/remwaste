import { Router } from "express";
import {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  bulkCreatePatients,
} from "../controllers/patients.controller";
import { authenticateJWT } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();
router.use(authenticateJWT);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */

router.get("/", getAllPatients);
/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Patient id
 *     responses:
 *       200:
 *         description: Patient object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 */
router.get("/:id", getPatientById);

// Only admin can create, update, delete, and bulk create

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient (admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patient created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       403:
 *         description: Forbidden
 */
router.post("/", requireRole("admin"), createPatient);

/**
 * @swagger
 * /api/patients/bulk:
 *   post:
 *     summary: Bulk create patients (admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [patients]
 *             properties:
 *               patients:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patients created
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 */

router.post("/bulk", requireRole("admin"), bulkCreatePatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient (admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Patient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       200:
 *         description: Patient updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.put("/:id", requireRole("admin"), updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   patch:
 *     summary: Partially update a patient (admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Patient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       200:
 *         description: Patient updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.patch("/:id", requireRole("admin"), updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient (admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Patient id
 *     responses:
 *       200:
 *         description: Patient deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.delete("/:id", requireRole("admin"), deletePatient);

export default router;
