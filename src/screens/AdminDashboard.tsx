import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  fetchEmployeesThunk,
  addEmployeeThunk,
  updateEmployeeThunk,
  deleteEmployeeThunk,
} from '../redux/employeesSlice';
import {Surface, Button, TextInput, Modal} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {commonStyle} from '../Common/CommonStyle';
import {string} from '../Common/String';
import {Images} from '../Common/Images';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(
    (state: RootState) => state.employees.employees,
  );
  const [newEmployee, setNewEmployee] = useState({name: '', position: ''});
  const [editEmoployeeId, setEditEmoployeeId] = useState(-1);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const handleAddEmployee = () => {
    dispatch(addEmployeeThunk(newEmployee));
    hideModal();
  };

  const handleUpdateEmployee = (id: string, name: string, position: string) => {
    dispatch(updateEmployeeThunk({id, employeeData: {id, name, position}}));
    hideModal();
  };

  const handleDeleteEmployee = (id: string) => {
    dispatch(deleteEmployeeThunk(id));
  };

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setNewEmployee({name: '', position: ''});
    setEditEmoployeeId(-1);
    setVisible(false);
  };

  const _renderItem = item => {
    return (
      <Surface style={styles.employeeContainer}>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: 'black',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: 'gray',
            }}>
            {item.position}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Button
            mode={'elevated'}
            onPress={() =>
              handleUpdateEmployee(item.id, item.name, item.position)
            }>
            {string.labels.update}
          </Button> */}
          <Pressable
            onPress={() => {
              setEditEmoployeeId(item.id);
              setNewEmployee({
                name: item.name,
                position: item.position,
              });
              showModal();
            }}>
            <Image style={styles.imgEdit} source={Images.icEdit} />
          </Pressable>
          {/* <Button
            mode={'elevated'}
            onPress={() => handleDeleteEmployee(item.id)}>
            {string.labels.delete}
          </Button> */}
          <Pressable
            style={{marginStart: moderateScale(10)}}
            onPress={() => {
              Alert.alert('', string.messages.deleteWarning, [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => handleDeleteEmployee(item.id)},
              ]);
            }}>
            <Image style={styles.imgEdit} source={Images.icDelete} />
          </Pressable>
        </View>
      </Surface>
    );
  };

  return (
    <View style={commonStyle.container}>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({item}) => _renderItem(item)}
      />

      <Surface style={styles.imgAddView}>
        <Pressable onPress={() => showModal()}>
          <Image style={styles.imgEdit} source={Images.icAdd} />
        </Pressable>
      </Surface>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <TextInput
          label={string.labels.name}
          mode="outlined"
          value={newEmployee.name}
          onChangeText={text => setNewEmployee({...newEmployee, name: text})}
          style={commonStyle.input}
        />
        <TextInput
          label={string.labels.position}
          mode="outlined"
          value={newEmployee.position}
          onChangeText={text =>
            setNewEmployee({...newEmployee, position: text})
          }
          style={commonStyle.input}
        />
        <Button
          mode="elevated"
          onPress={() => {
            editEmoployeeId === -1
              ? handleAddEmployee()
              : handleUpdateEmployee(
                  editEmoployeeId.toString(),
                  newEmployee?.name,
                  newEmployee?.position,
                );
          }}>
          {editEmoployeeId === -1
            ? string.labels.addEmployee
            : string.labels.updateEmployee}
        </Button>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  employeeContainer: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: moderateScale(12),
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  imgEdit: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  imgAddView: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(20),
    end: moderateScale(20),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default AdminDashboard;
