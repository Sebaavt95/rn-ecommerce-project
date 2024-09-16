import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, .2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: colors.tertiary,
    gap: 10,
  },
});
