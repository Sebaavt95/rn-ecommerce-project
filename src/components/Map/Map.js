import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GOOGLE_MAPS_API_KEY } from '../../firebase/database';
import colors from '../../global/colors';

const Map = ({ location }) => {
  const LATITUDE = location.lat;
  const LONGITUDE = location.lng;
  const CENTER = `${LATITUDE},${LONGITUDE}`;
  const ZOOM = 15;
  const SIZE = {
    width: 600,
    height: 300,
  };
  const MAPTYPE = 'roadmap';
  const MARKER = {
    label: '',
    color: 'red',
  };
  const MARKERS = `color:${MARKER.color}%7Clabel:${MARKER.label}%7C${LATITUDE},${LONGITUDE}`;

  const mapStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${CENTER}
		&zoom=${ZOOM}
		&size=${SIZE.width}x${SIZE.height}
		&maptype=${MAPTYPE}
		&markers=${MARKERS}
		&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    <View>
      <Image source={{ uri: mapStaticUrl }} style={styles.image} />
    </View>
  );
};

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

export default Map;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    backgroundColor: colors.tertiary,
  },
});
