import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.primary,
  },
  emailWrapper: {
    alignSelf: 'flex-start',
    padding: 20,
    marginBottom: 30,
    backgroundColor: colors.info,
    width: '100%',
  },
  image: {
    width: 150,
    height: 150,
  },
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loaderWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionButtons: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 20,
    gap: 20,
    alignItems: 'center',
  },
});
