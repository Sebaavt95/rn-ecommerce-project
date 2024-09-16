import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../../../../components/Text';
import NotFound from '../../../../components/NotFound';
import Modal from '../../../../components/Modal';
import Loader from '../../../../components/Loader';
import Button from '../../../../components/Button';
import colors from '../../../../global/colors';
import {
  useRemoveUserLocationMutation,
  useSaveFavouriteLocationMutation,
} from '../../../../services/shop';
import styles from './styles';

const AddressList = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmType, setIsConfirmType] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const {
    id,
    selectedLocation: locationFromRedux,
    locations,
  } = useSelector(state => state.auth.user);
  const [saveFavouriteLocation] = useSaveFavouriteLocationMutation();
  const [removeLocationTrigger, { isLoading: isRemoveLoading }] =
    useRemoveUserLocationMutation();

  const selectLocation = (location, isConfirm) => {
    setIsModalOpen(true);
    setIsConfirmType(isConfirm);
    setSelectedLocation(location);
  };

  const confirmLocation = async () => {
    try {
      await saveFavouriteLocation({ userId: id, location: selectedLocation });
      setIsModalOpen(false);
      navigation.navigate('home');
    } catch (error) {
      console.log({ error });
    }
  };

  const removeLocation = async () => {
    try {
      const { id: locationId } = selectedLocation;
      if (!locationId) return;
      if (locationFromRedux?.id === locationId)
        saveFavouriteLocation({ userId: id, location: null });
      setIsModalOpen(false);
      await removeLocationTrigger({ userId: id, locationId });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleConfirm = () => {
    if (isConfirmType) {
      confirmLocation();
      return;
    }
    removeLocation();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.locationsWrapper}>
          {!locations?.length ? (
            <NotFound
              iconName="location"
              message="No hay ubicaciones guardadas"
            />
          ) : (
            <>
              <Text type="bold" customStyles={styles.title}>
                Ubicaciones guardadas
              </Text>
              {isRemoveLoading ? (
                <View style={styles.loaderWrapper}>
                  <Loader size="large" color="tertiary" />
                </View>
              ) : (
                <FlatList
                  data={locations}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.addressWrapper}>
                        <Text fontSize={16} customStyles={styles.text}>
                          {item?.address}
                        </Text>
                        <View style={styles.buttonsWrapper}>
                          <Button
                            handlePress={() => selectLocation(item, true)}
                          >
                            <Ionicons
                              name="checkmark-circle-outline"
                              size={30}
                              color={colors.white}
                            />
                          </Button>
                          <Button
                            variant="error"
                            handlePress={() => selectLocation(item, false)}
                          >
                            <Ionicons
                              name="remove-circle-outline"
                              size={30}
                              color={colors.white}
                            />
                          </Button>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={key => key.id}
                />
              )}
            </>
          )}
        </View>
        <Button
          style={styles.addBtn}
          handlePress={() => navigation.navigate('location')}
        >
          <Ionicons name="location-sharp" size={24} color={colors.white} />
          Agregar nueva ubicación
        </Button>
      </View>
      <Modal
        transparent
        isOpen={isModalOpen}
        handleConfirm={handleConfirm}
        handleCancel={() => setIsModalOpen(false)}
      >
        {isConfirmType && <Text>{selectedLocation?.address}</Text>}
        <Text>¿{isConfirmType ? 'Seleccionar' : 'Eliminar'} dirección?</Text>
      </Modal>
    </>
  );
};

AddressList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default AddressList;
