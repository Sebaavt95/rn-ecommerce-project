import { Pressable, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const Button = ({
  variant = 'primary',
  touchable = true,
  disabled = false,
  handlePress,
  width,
  style: customStyles,
  children,
}) => {
  const Wrapper = touchable ? TouchableOpacity : Pressable;
  return (
    <Wrapper
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        width && { width },
        customStyles && { ...customStyles },
      ]}
      disabled={disabled}
      onPress={handlePress && handlePress}
    >
      <Text textAlign="center">{children}</Text>
    </Wrapper>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  touchable: PropTypes.bool,
  disabled: PropTypes.bool,
  handlePress: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.shape({}),
  children: PropTypes.node,
};

export default Button;
