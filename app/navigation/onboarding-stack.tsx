import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';
import Onboarding from '../screens/onboarding';

const OnboardingStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <OnboardingStack.Navigator headerMode="none">
      <OnboardingStack.Screen name={screens.onboardingStack} component={Onboarding} />
    </OnboardingStack.Navigator>
  );
}
