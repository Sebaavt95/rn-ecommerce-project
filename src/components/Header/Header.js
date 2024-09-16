import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text fontSize={25} textAlign="center">
        {title}
      </Text>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
