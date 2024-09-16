import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import { useSaveUserImageMutation } from '../../../../services/shop';
import styles from './styles';

const ImageSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const { id } = useSelector(state => state.auth.user);
  const [triggerSaveProfileImage, { isError }] = useSaveUserImageMutation();

  const addPhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;
    const { assets, canceled } = await ImagePicker.launchCameraAsync({
      aspect: [9, 9],
      quality: 0.2,
      base64: true,
      allowsEditing: true,
    });
    if (canceled) return;
    setImage(`data:image/jpeg;base64,${assets[0].base64}`);
  };

  const confirmImage = async () => {
    await triggerSaveProfileImage({ id, image });
    if (isError) return;
    setIsModalOpen(false);
    setImage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImage(null);
  };

  return (
    <>
      <Button width="60%" handlePress={() => setIsModalOpen(true)}>
        <Text textAlign="center">Cargar imagen</Text>
      </Button>
      <Modal
        transparent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleConfirm={confirmImage}
        confirmBtnDisabled={!image}
        handleCancel={handleCloseModal}
      >
        <Button handlePress={addPhoto} style={styles.modalButton}>
          <Text textAlign="center">{!image ? 'Tomar foto' : 'Tomar otra'}</Text>
        </Button>
        {image && (
          <Text textAlign="center" customStyles={styles.text}>
            ¡Imagen tomada correctamente!
          </Text>
        )}
      </Modal>
    </>
  );
};

export default ImageSelector;
