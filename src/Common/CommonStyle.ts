import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(16),
  },
  input: {
    marginBottom: moderateScale(12),
    paddingLeft: moderateScale(8),
  },
});
