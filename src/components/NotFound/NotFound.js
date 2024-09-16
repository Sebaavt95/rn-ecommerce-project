import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Entypo from '@expo/vector-icons/Entypo';
import Text from '../Text';
import colors from '../../global/colors';

const NotFound = ({ iconName, message }) => {
  return (
    <View style={styles.notFoundContainer}>
      {iconName && <Entypo name={iconName} size={60} color={colors.white} />}
      <Text customStyles={{ marginTop: 5 }} textAlign="center">
        {message}
      </Text>
    </View>
  );
};

NotFound.propTypes = {
  iconName: PropTypes.string,
  message: PropTypes.string,
};

export default NotFound;

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
