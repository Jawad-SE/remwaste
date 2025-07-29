import { prisma } from "../prisma/client";

export const getAllPatientsService = async () => prisma.patient.findMany();

export const createPatientService = async (data: any) => {
  const { firstName, lastName, email, phoneNumber, dob } = data;
  if (!firstName || !lastName || !email || !phoneNumber || !dob)
    throw new Error("All fields required");
  return prisma.patient.create({
    data: { firstName, lastName, email, phoneNumber, dob: new Date(dob) },
  });
};

export const getPatientByIdService = async (id: number) =>
  prisma.patient.findUnique({ where: { id } });

export const updatePatientService = async (id: number, data: any) => {
  const { id: _id, ...updateData } = data;

  if (updateData.dob) {
    updateData.dob = new Date(updateData.dob);
  } else {
    delete updateData.dob;
  }

  return prisma.patient.update({
    where: { id },
    data: updateData,
  });
};

export const deletePatientService = async (id: number) =>
  prisma.patient.delete({ where: { id } });

export const bulkCreatePatientsService = async (patients: any[]) => {
  if (!patients || !Array.isArray(patients) || patients.length === 0)
    throw new Error("Invalid patients array");
  return prisma.patient.createMany({ data: patients });
};
