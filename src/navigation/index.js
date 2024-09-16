import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { fetchSession } from '../db';
import { loadUserData } from '../features/authSlice';

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged } = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const getDataFromSQLite = async () => {
    try {
      const result = await fetchSession();
      const { email, id, token } = result;
      dispatch(loadUserData({ email, id, token }));
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromSQLite();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      {isLogged ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
