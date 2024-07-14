import axios from 'axios';

// Replace 'YOUR_MACHINE_IP' with your actual machine IP address
const api = axios.create({
  baseURL: 'http://172.20.10.6:3000', // Ensure json-server is running on this port
});

export const loginUser = async (email: string, password: string) => {
  const response = await api.get(`/users?email=${email}`);
  const users = response.data;

  if (users.length === 0) {
    throw new Error('User not found');
  }

  const user = users[0];

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return user;
};

export const signupUser = async (userData: any) => {
  const response = await api.post('/users', userData);
  alert("called"+JSON.stringify(response.data))
  return response.data;
};

export const fetchEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const addEmployee = async (employeeData: any) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id: string, employeeData: any) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
