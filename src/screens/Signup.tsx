import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {signup} from '../redux/authSlice';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const Signup = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Customer'>('Customer');
  const dispatch = useDispatch();

  const handleSignup = () => {
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      role,
      password,
    };
    dispatch(signup(userData));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <>
          <TextInput
            label="First Name"
            mode="outlined"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            keyboardType={'email-address'}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Phone"
            mode="outlined"
            value={phone}
            keyboardType={'phone-pad'}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            label="Address"
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <RadioButton.Group
            onValueChange={newValue => setRole(newValue)}
            value={role}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="Admin" />
              <Text>Admin</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 15,
                  alignItems: 'center',
                }}>
                <RadioButton value="Customer" />
                <Text>Customer</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Button mode={'elevated'} onPress={handleSignup} style={{margin: 10}}>
            Signup
          </Button>
          <Button
            mode={'elevated'}
            onPress={() => navigation.navigate('Login')}
            style={{margin: 10}}>
            Go to Login
          </Button>
        </>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default Signup;
