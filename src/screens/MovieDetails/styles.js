import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  detailsText: {
    marginBottom: 10,
  },
  sinopsis: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  price: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  purchaseActions: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
  },
  quantity: {
    width: 20,
    marginHorizontal: 20,
  },
});
