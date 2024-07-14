import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/authSlice';
import {AppDispatch, RootState} from '../redux/store';
import {Button, TextInput} from 'react-native-paper';
import {commonStyle} from '../Common/CommonStyle';
import {string} from '../Common/String';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({email, password}));
  };

  return (
    <View style={commonStyle.container}>
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
      <TextInput
        label={string.labels.email}
        mode="outlined"
        value={email}
        onChangeText={setEmail}
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
      <Button mode={'elevated'} onPress={handleLogin} style={{margin: 10}}>
        {string.labels.login}
      </Button>
      <Button
        mode={'elevated'}
        onPress={() => navigation.navigate('Signup')}
        style={{margin: 10}}>
        {string.labels.goToSignup}
      </Button>
    </View>
  );
};

export default Login;
