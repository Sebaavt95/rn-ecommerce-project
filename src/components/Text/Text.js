import { Text as TextComponent } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../global/colors';

const Text = ({
  children,
  fontSize = 20,
  type = 'regular',
  color = colors.white,
  textAlign = 'left',
  customStyles,
}) => {
  const fontFamilies = {
    light: 'JosefinLight',
    regular: 'JosefinRegular',
    medium: 'JosefinMedium',
    semibold: 'JosefinSemibold',
    bold: 'JosefinBold',
  };

  return (
    <TextComponent
      style={{
        fontFamily: fontFamilies[type],
        fontSize,
        color,
        textAlign,
        ...customStyles,
      }}
    >
      {children}
    </TextComponent>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  fontSize: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  customStyles: PropTypes.shape({}),
};
export default Text;
