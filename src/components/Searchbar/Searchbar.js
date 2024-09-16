import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SelectDropdown from 'react-native-select-dropdown';
import Feather from '@expo/vector-icons/Feather';
import { selectGenre } from '../../features/shopSlice';
import styles from './styles';

const Searchbar = ({ handleSelect }) => {
  const genres = useSelector(state => state.shop.genres);

  const dispatch = useDispatch();

  const handleSelectOption = selectedGenre => {
    dispatch(selectGenre(selectedGenre));
    handleSelect();
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={genres}
        onSelect={selectedItem => handleSelectOption(selectedItem)}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.name) || 'Géneros'}
              </Text>
              <Feather
                name={isOpened ? 'arrow-up' : 'arrow-down'}
                size={24}
                color="black"
              />
            </View>
          );
        }}
        renderItem={(item, _, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#D2D9DF' }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

Searchbar.propTypes = {
  handleSelect: PropTypes.func,
};

export default Searchbar;
