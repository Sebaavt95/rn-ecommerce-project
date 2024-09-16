import { StyleSheet } from 'react-native';
import colors from '../../../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loaderWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'relative',
    flex: 1,
  },
  buttonsWrapper: {
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    gap: 10,
  },
  errorWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
