import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShopStack from './ShopStack';
import ProfileStack from './ProfileStack';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import colors from '../global/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const renderTabIcon = (iconName, focused) => {
    return (
      <Ionicons
        name={iconName}
        size={32}
        color={colors[focused ? 'white' : 'primary']}
      />
    );
  };

  const TABS = [
    {
      name: 'shopTab',
      component: ShopStack,
      icon: 'bag-handle',
    },
    {
      name: 'cartTab',
      component: Cart,
      icon: 'cart',
    },
    {
      name: 'ordersTab',
      component: Orders,
      icon: 'list',
    },
    {
      name: 'profileTab',
      component: ProfileStack,
      icon: 'person',
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon(tab.icon, focused),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tertiary,
    shadowColor: colors.black,
    elevation: 4,
    borderRadius: 10,
    height: 60,
  },
});
