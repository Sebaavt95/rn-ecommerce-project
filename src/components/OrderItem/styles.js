import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.info,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  textWrapper: {
    backgroundColor: colors.light,
    paddingHorizontal: 8,
  },
  list: {
    marginTop: 20,
  },
  itemWrapper: {
    marginBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: colors.info,
    borderTopWidth: 3,
    borderTopColor: colors.info,
    paddingVertical: 5,
  },
});
