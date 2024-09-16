import { StyleSheet } from 'react-native';
import colors from '../../../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  locationsWrapper: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
  },
  loaderWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.tertiary,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    width: '55%',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  addBtn: {
    margin: 10,
  },
});
