import { Request, Response } from "express";
import {
  getAllPatientsService,
  createPatientService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService,
  bulkCreatePatientsService,
} from "../services/patients.service";
import { logger } from "../config/logger";

export const getAllPatients = async (_: Request, res: Response) => {
  const patients = await getAllPatientsService();
  res.json(patients);
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await createPatientService(req.body);
    res.status(201).json(patient);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const patient = await getPatientByIdService(Number(req.params.id));
  if (!patient) return res.status(404).json({ error: "Not found" });
  res.json(patient);
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patient = await updatePatientService(Number(req.params.id), req.body);
    res.json(patient);
  } catch (e: any) {
    console.error('UPDATE ERROR:', e);
    res.status(404).json({ error: e.message });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    await deletePatientService(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
};

export const bulkCreatePatients = async (req: any, res: any) => {
  const user = req.user;
  const { patients } = req.body;
  logger.info(
    `Admin ${user.email} bulk-creating ${patients?.length || 0} patients`
  );
  try {
    const result = await bulkCreatePatientsService(patients);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
