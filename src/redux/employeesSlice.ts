import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../api/api';

interface Employee {
  id: string;
  name: string;
  position: string;
}

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
};

export const fetchEmployeesThunk = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await fetchEmployees();
    return response;
  }
);

export const addEmployeeThunk = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData: Employee) => {
    const response = await addEmployee(employeeData);
    return response;
  }
);

export const updateEmployeeThunk = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }: { id: string, employeeData: Employee }) => {
    const response = await updateEmployee(id, employeeData);
    return response;
  }
);

export const deleteEmployeeThunk = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: string) => {
    const response = await deleteEmployee(id);
    return response;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(addEmployeeThunk.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(updateEmployeeThunk.fulfilled, (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    });
    builder.addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload.id);
    });
  },
});

export default employeesSlice.reducer;
