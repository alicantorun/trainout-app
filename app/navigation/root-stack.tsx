import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { screens } from '../config';
import AuthStack from './auth-stack';
import DrawerStack from './drawer-stack';
import OnboardingStack from './onboarding-stack';
import Loading from '../components/Loading';
import * as AuthSelectors from '../entities/auth/selectors';

import * as AuthActions from '../entities/auth/actions';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector(AuthSelectors.selectUser);

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [initializing, setInitializing] = React.useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    dispatch(AuthActions.setCurrentUser(user));
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log('USER', user);

  return (
    <RootStack.Navigator headerMode="none">
      {!user ? (
        <>
          <RootStack.Screen name={screens.onboardingStack} component={OnboardingStack} />
          <RootStack.Screen name={screens.authStack} component={AuthStack} />
        </>
      ) : (
        <RootStack.Screen name={screens.drawerStack} component={DrawerStack} />
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
