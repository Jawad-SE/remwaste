// src/hooks/__tests__/usePatients.test.tsx

import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  usePatients,
  usePatient,
  useCreatePatient,
  useDeletePatient,
  useEditPatient,
} from "../usePatients";
import { api } from "@/lib/api";

jest.mock("@/lib/api");

const mockPatientFormData = {
  firstName: 'C',
  lastName: 'Doe',
  email: 'c@d.com',
  phoneNumber: '123456',
  dob: '1990-01-01'
};

const createWrapper = () => {
  const queryClient = new QueryClient();
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePatients", () => {
  it("fetches patients", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: [{ id: 1, firstName: "A" }],
    });
    const { result } = renderHook(() => usePatients(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.[0].firstName).toBe("A");
  });
});

describe("usePatient", () => {
  it("fetches patient by id", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: { id: 2, firstName: "B" },
    });
    const { result } = renderHook(() => usePatient(2), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.firstName).toBe("B");
  });
});


describe('useCreatePatient', () => {
  it('creates a new patient and invalidates "patients" query', async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { id: 3, ...mockPatientFormData } });

    const queryClient = new QueryClient();
    const invalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');

    const Wrapper = function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    };
    Wrapper.displayName = 'Wrapper';

    const { result } = renderHook(() => useCreatePatient(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockPatientFormData);
    });

    expect(api.post).toHaveBeenCalledWith('/patients', mockPatientFormData);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['patients'] });
  });
});


describe("useDeletePatient", () => {
  it('deletes a patient and invalidates "patients" query', async () => {
    (api.delete as jest.Mock).mockResolvedValue({ data: {} });

    const queryClient = new QueryClient();

    const invalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeletePatient(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.mutateAsync(3);
    });

    expect(api.delete).toHaveBeenCalledWith("/patients/3");
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["patients"] });
  });
});

describe("useEditPatient", () => {
  it('edits a patient and invalidates "patients" query', async () => {
    const patientFormData = {
      firstName: "D",
      lastName: "Edits",
      email: "d@edits.com",
      phoneNumber: "1234567890",
      dob: "1995-05-05",
    };
    const editData = { id: 4, data: patientFormData };

    (api.patch as jest.Mock).mockResolvedValue({
      data: { id: 4, ...editData.data },
    });

    const queryClient = new QueryClient();
    const invalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useEditPatient(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.mutateAsync(editData);
    });

    expect(api.patch).toHaveBeenCalledWith("/patients/4", editData.data);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["patients"] });
  });
});
