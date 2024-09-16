import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../global/colors';

const Loader = ({ size = 'small', color = 'white' }) => (
  <ActivityIndicator size={size} color={colors[color]} />
);

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Loader;
