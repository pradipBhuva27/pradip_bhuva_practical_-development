import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { Button } from 'react-native-paper';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode={"elevated"} onPress={handleLogin} style={{margin:10}}>Login</Button>
      <Button mode={"elevated"} onPress={() => navigation.navigate('Signup')} style={{margin:10}}>Go to Signup</Button>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Login;
