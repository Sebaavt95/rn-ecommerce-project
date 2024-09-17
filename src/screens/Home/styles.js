import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  addressTopWrapper: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.info,
    borderColor: colors.white,
    borderBottomWidth: 2,
  },
  sendTitle: {
    marginRight: 10,
  },
  changeAddressBtn: {
    padding: 5,
    backgroundColor: colors.tertiary,
    marginLeft: 'auto',
  },
  homeTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 50,
  },
  searchbarWrapper: {
    padding: 20,
  },
  highlightedTitle: {
    marginBottom: 20,
  },
});
