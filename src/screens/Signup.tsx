import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {signup} from '../redux/authSlice';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {commonStyle} from '../Common/CommonStyle';
import {string} from '../Common/String';
import {moderateScale} from 'react-native-size-matters';
import { AppDispatch } from '../redux/store';

const Signup = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const dispatch = useDispatch<AppDispatch>();

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
    <View style={commonStyle.container}>
      <KeyboardAvoidingScrollView>
        <>
          <TextInput
            label={string.labels.firstName}
            mode="outlined"
            value={firstName}
            onChangeText={setFirstName}
            style={commonStyle.input}
          />
          <TextInput
            label={string.labels.lastName}
            mode="outlined"
            value={lastName}
            onChangeText={setLastName}
            style={commonStyle.input}
          />
          <TextInput
            label={string.labels.email}
            mode="outlined"
            value={email}
            keyboardType={'email-address'}
            onChangeText={setEmail}
            style={commonStyle.input}
          />
          <TextInput
            label={string.labels.phone}
            mode="outlined"
            value={phone}
            keyboardType={'phone-pad'}
            onChangeText={setPhone}
            style={commonStyle.input}
          />
          <TextInput
            label={string.labels.address}
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            style={commonStyle.input}
          />
          <TextInput
            label={string.labels.password}
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={commonStyle.input}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: 'black',
              marginVertical: moderateScale(5),
            }}>
            {string.labels.pleaseSelectYourRole}
          </Text>
          <RadioButton.Group
            onValueChange={newValue => setRole(newValue)}
            value={role}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="Admin" />
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: 'black',
                }}>
                Admin
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 15,
                  alignItems: 'center',
                }}>
                <RadioButton value="Customer" />
                <Text style={{
                  fontSize: moderateScale(16),
                  color: 'black',
                }}>Customer</Text>
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

export default Signup;
