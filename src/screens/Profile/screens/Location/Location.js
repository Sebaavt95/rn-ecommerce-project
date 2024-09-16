import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import Text from '../../../../components/Text';
import Loader from '../../../../components/Loader';
import Button from '../../../../components/Button';
import Map from '../../../../components/Map';
import colors from '../../../../global/colors';
import { useSaveUserLocationMutation } from '../../../../services/shop';
import styles from './styles';

const LocationSelector = ({ navigation }) => {
  const { id } = useSelector(state => state.auth.user);

  const [location, setLocation] = useState({
    lat: '',
    lng: '',
  });
  const [saveLocation, { isError, error }] = useSaveUserLocationMutation();

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const currentLocation = await Location.getCurrentPositionAsync();
    const {
      coords: { latitude: lat, longitude: lng },
    } = currentLocation;
    setLocation({ lat, lng });
  };

  const handleConfirmLocation = async () => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude: location.lat,
        longitude: location.lng,
      });
      if (!response.length) return;
      const address = response[0].formattedAddress;
      await saveLocation({
        location: { ...location, address },
        id,
      });
      navigation.navigate('addressList');
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const isLoadedLocation = location && location.lat && location.lng;

  return (
    <View style={styles.container}>
      {!isLoadedLocation ? (
        <View style={styles.loaderWrapper}>
          <Loader size={80} color="tertiary" />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <Map location={location} />
          <View style={styles.buttonsWrapper}>
            <Button width="100%" handlePress={handleConfirmLocation}>
              <Text textAlign="center">Confirmar ubicación</Text>
            </Button>
            <Button variant="secondary" handlePress={() => navigation.goBack()}>
              <Text>Volver</Text>
            </Button>
          </View>
          {isError && (
            <View style={styles.errorWrapper}>
              <Text color={colors.error}>{error?.data?.error?.message}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

LocationSelector.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LocationSelector;
