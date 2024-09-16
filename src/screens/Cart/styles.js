import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
  },
  list: {
    width: '100%',
  },
  summary: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.secondary,
  },
  confirmButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.tertiary,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 35,
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
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    width: 80,
  },
  confirm: {
    backgroundColor: colors.tertiary,
    marginLeft: 20,
  },
  cancel: {
    borderWidth: 1,
    borderColor: colors.white,
  },
});
