import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  base: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primary: {
    backgroundColor: colors.tertiary,
    borderColor: colors.tertiary,
  },
  secondary: {
    borderColor: colors.white,
  },
  info: {
    backgroundColor: colors.info,
  },
  error: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
});
