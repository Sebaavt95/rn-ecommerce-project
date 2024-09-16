import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  // Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import MainNavigator from './src/navigation';
import store from './src/store';
import colors from './src/global/colors';
import fonts from './src/global/fonts';
import { init } from './src/db';

const App = () => {
  const [loadedFonts] = useFonts(fonts);

  (async () => {
    try {
      await init();
      console.log('Base de datos cargada');
    } catch (error) {
      console.log('Error de base de datos', { error });
    }
  })();

  const { width, height } = useWindowDimensions();

  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    setIsPortrait(width < height);
  }, [width, height]);

  if (!loadedFonts) return null;

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
