import React from 'react';
import { I18nManager, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { drawerIcons } from '../../helpers';
import { images } from '../../constants';
import styles from './drawer.styles';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../../entities/auth/actions';

function Drawer(props) {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();

  const i18 = (key) => {
    return t(key);
  };

  // this should be called for language that need RTL for example for Arabic
  const changeLanguageWithRTL = async () => {
    let currentLanguage = await AsyncStorage.getItem('language');
    if (currentLanguage == 'en') {
      await AsyncStorage.setItem('language', 'fr');
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    } else {
      await AsyncStorage.setItem('language', 'en');
      I18nManager.forceRTL(false);
      RNRestart.Restart();
    }
  };

  const changeLanguageWithoutRTL = async () => {
    let currentLanguage = await AsyncStorage.getItem('language');
    if (currentLanguage == 'en') {
      await AsyncStorage.setItem('language', 'fr');
      RNRestart.Restart();
    } else {
      await AsyncStorage.setItem('language', 'en');
      RNRestart.Restart();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FastImage source={images.icon} style={styles.image} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => changeLanguageWithoutRTL()}>
          {drawerIcons.language}
          {/*  TODO */}
          <Text style={styles.itemText as any}>{i18('Drawer.changeLanguage')}</Text>
        </TouchableOpacity>
        <Text onPress={() => dispatch(AuthActions.logout())}>LOGOUT</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export { Drawer };
