import { Modal as ModalComponent, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Button from '../Button';
import styles from './styles';

const Modal = ({
  isOpen = false,
  onClose,
  handleConfirm,
  confirmText = 'Aceptar',
  handleCancel,
  cancelText = 'Cancelar',
  animationType = 'slide',
  transparent = true,
  children,
}) => {
  return (
    <ModalComponent
      animationType={animationType}
      transparent={transparent}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.content}>{children}</View>
          {(handleCancel || handleConfirm) && (
            <View style={styles.buttonsContainer}>
              {handleCancel && (
                <Button variant="secondary" handlePress={handleCancel}>
                  <Text textAlign="center">{cancelText}</Text>
                </Button>
              )}
              {handleConfirm && (
                <Button handlePress={handleConfirm}>
                  <Text textAlign="center">{confirmText}</Text>
                </Button>
              )}
            </View>
          )}
        </View>
      </View>
    </ModalComponent>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  handleCancel: PropTypes.func,
  cancelText: PropTypes.string,
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
