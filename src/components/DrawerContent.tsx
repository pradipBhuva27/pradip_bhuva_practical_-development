import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.container}>
        <Button title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default DrawerContent;
