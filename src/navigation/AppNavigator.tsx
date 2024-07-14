import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AdminDashboard from '../screens/AdminDashboard';
import CustomerDashboard from '../screens/CustomerDashboard';
import DrawerContent from '../components/DrawerContent';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { navigationRef } from '../Utils/NavigationUtils';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} useLegacyImplementation={true}>
          {userRole === 'Admin' ? (
            <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
          ) : (
            <Drawer.Screen name="CustomerDashboard" component={CustomerDashboard} />
          )}
        </Drawer.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
