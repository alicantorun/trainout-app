import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useThemeContext} from '../providers/ThemeProvider';

const Stack = createNativeStackNavigator();

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {color: theme.fontColor},
        headerTintColor: theme.tintColor,
      }}>
      <Stack.Screen name="Screen3" component={RegisterScreen} />
      <Stack.Screen name="Screen2" component={LoginScreen} />
      <Stack.Screen name="Screen1" component={HomeScreen} />
      <Stack.Screen name="Screen4" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
