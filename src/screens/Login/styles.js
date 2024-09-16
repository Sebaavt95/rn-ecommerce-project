import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
