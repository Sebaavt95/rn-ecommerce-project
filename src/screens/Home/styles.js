import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  addressTopWrapper: {
    width: '100%',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 50,
  },
  searchbarWrapper: {
    width: '100%',
    padding: 20,
  },
  movies: {
    width: '100%',
  },
  highlightedTitle: {
    marginBottom: 20,
  },
});
