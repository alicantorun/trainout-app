import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../components';
import { tabIcons } from '../../helpers';
import styles from './bottom-tab.styles';
import { screens } from '../../config';

function BottomTab(props) {
  const [t, i18n] = useTranslation();

  const i18 = (key) => {
    return t(key);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => props.navigation.navigate(screens.profile)}>
        {tabIcons.search}
        <Text style={styles.tabText}>{i18('BottomTab.profile')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => props.navigation.navigate(screens.home)}>
        {tabIcons.home}
        <Text style={styles.tabText}>{i18('BottomTab.home')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => props.navigation.navigate(screens.chatroomStack)}>
        {tabIcons.profile}
        <Text style={styles.tabText}>{i18('BottomTab.chat')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export { BottomTab };
