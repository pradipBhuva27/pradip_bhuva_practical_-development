import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchEmployeesThunk, addEmployeeThunk, updateEmployeeThunk, deleteEmployeeThunk } from '../redux/employeesSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const handleAddEmployee = () => {
    dispatch(addEmployeeThunk(newEmployee));
    setNewEmployee({ name: '', position: '' });
  };

  const handleUpdateEmployee = (id: string, name: string, position: string) => {
    dispatch(updateEmployeeThunk({ id, employeeData: { id, name, position } }));
  };

  const handleDeleteEmployee = (id: string) => {
    dispatch(deleteEmployeeThunk(id));
  };

  return (
    <View style={styles.container}>
      <Text>Admin Dashboard</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.employeeContainer}>
            <Text>{item.name}</Text>
            <Text>{item.position}</Text>
            <Button title="Update" onPress={() => handleUpdateEmployee(item.id, item.name, item.position)} />
            <Button title="Delete" onPress={() => handleDeleteEmployee(item.id)} />
          </View>
        )}
      />
      <TextInput
        placeholder="Name"
        value={newEmployee.name}
        onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Position"
        value={newEmployee.position}
        onChangeText={(text) => setNewEmployee({ ...newEmployee, position: text })}
        style={styles.input}
      />
      <Button title="Add Employee" onPress={handleAddEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default AdminDashboard;
