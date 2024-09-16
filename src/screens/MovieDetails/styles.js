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
    borderWidth: 2,
    borderColor: colors.tertiary,
    gap: 10,
    borderRadius: 8,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 20,
  },
});
