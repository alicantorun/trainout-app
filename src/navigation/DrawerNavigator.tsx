/* eslint-disable react-native/no-inline-styles */
import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {ReactElement} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import SettingsScreen1 from '../screens/SettingsScreen';
import SettingsScreen2 from '../screens/SettingsScreen';
import {useSafeArea} from 'react-native-safe-area-context';

export type DrawerParamList = {
  default: undefined;
};

export type DrawerNavigationProps<
  T extends keyof DrawerParamList = 'default'
> = DrawerNavigationProp<DrawerParamList, T>;

const Drawer = createDrawerNavigator<DrawerParamList | any>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function CustomDrawerContent({drawerPosition, navigation}): ReactElement {
  const insets = useSafeArea();

  return (
    <ScrollView
      contentContainerStyle={[
        {
          paddingTop: insets.top + 4,
          paddingLeft: drawerPosition === 'left' ? insets.left : 0,
          paddingRight: drawerPosition === 'right' ? insets.right : 0,
        },
      ]}
      style={styles.container}>
      <DrawerItem
        label="SettingsScreen1"
        onPress={(): void => {
          navigation.navigate('SettingsScreen1');
        }}
      />
      <DrawerItem
        label="SettingsScreen2"
        onPress={(): void => {
          navigation.navigate('SettingsScreen2');
        }}
      />
      <DrawerItem
        label="Close"
        onPress={(): void => {
          navigation.closeDrawer();
        }}
      />
    </ScrollView>
  );
}

function Navigator(): ReactElement {
  return (
    <Drawer.Navigator
      drawerContent={(
        props: DrawerContentComponentProps | any,
      ): ReactElement => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="SettingsScreen1" component={SettingsScreen1} />
      <Drawer.Screen name="SettingsScreen2" component={SettingsScreen2} />
    </Drawer.Navigator>
  );
}

export default Navigator;
