import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {moderateScale} from 'react-native-size-matters';

const App = () => {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        text1Style={{
          fontSize: moderateScale(15),
          fontWeight: '400',
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: moderateScale(15),
          fontWeight: '400',
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast config={toastConfig} position='bottom'/>
    </Provider>
  );
};

export default App;
