import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Patient, PatientFormData } from '@/types/patient';

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data } = await api.get('/patients');
      return data;
    },
  });
}

export function usePatient(id: number) {
  return useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: async () => {
      const { data } = await api.get(`/patients/${id}`);
      return data;
    },
  });
}

export function useCreatePatient() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: PatientFormData) => api.post('/patients', data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['patients'] }),
  });
}

export function useDeletePatient() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/patients/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: ['patients'] }),
  });
}

export function useEditPatient() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatientFormData }) =>
      api.patch(`/patients/${id}`, data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['patients'] }),
  });
}
