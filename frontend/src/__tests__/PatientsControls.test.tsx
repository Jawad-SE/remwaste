import { render, screen, fireEvent } from '@testing-library/react';
import PatientsControls from '../components/patients/PatientsControls';

jest.mock('@/hooks/useRole', () => ({
  useRole: jest.fn(),
}));
import { useRole } from '@/hooks/useRole';

describe('PatientsControls', () => {
  const setSearch = jest.fn();
  const setSortField = jest.fn();
  const setSortOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRole as jest.Mock).mockReturnValue('admin');
  });

  it('renders and updates search input', () => {
    render(
      <PatientsControls
        search="foo"
        setSearch={setSearch}
        sortField="firstName"
        setSortField={setSortField}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    const searchInput = screen.getByPlaceholderText(/search by name or email/i);
    fireEvent.change(searchInput, { target: { value: 'john' } });
    expect(setSearch).toHaveBeenCalledWith('john');
  });

  it('shows Add Patient button for admin', () => {
    render(
      <PatientsControls
        search=""
        setSearch={setSearch}
        sortField="firstName"
        setSortField={setSortField}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    expect(screen.getByText(/add patient/i)).toBeInTheDocument();
  });

  it('changes sort field when option is selected', () => {
    render(
      <PatientsControls
        search=""
        setSearch={setSearch}
        sortField="firstName"
        setSortField={setSortField}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    // Open Listbox
    fireEvent.click(screen.getByRole('button', { name: /first name/i }));
    fireEvent.click(screen.getByText(/last name/i));
    expect(setSortField).toHaveBeenCalledWith('lastName');
  });

  it('toggles sort order when button is clicked', () => {
    render(
      <PatientsControls
        search=""
        setSearch={setSearch}
        sortField="firstName"
        setSortField={setSortField}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    fireEvent.click(screen.getByLabelText(/toggle sort order/i));
    expect(setSortOrder).toHaveBeenCalled();
  });

  it('does not show Add Patient button if not admin', () => {
    (useRole as jest.Mock).mockReturnValue('user');
    render(
      <PatientsControls
        search=""
        setSearch={setSearch}
        sortField="firstName"
        setSortField={setSortField}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    expect(screen.queryByText(/add patient/i)).not.toBeInTheDocument();
  });
});
