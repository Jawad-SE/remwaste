export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
};

export type PatientFormData = Omit<Patient, 'id'>;
