import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import { MenuHeader } from '../../components';
import styles from './settings.styles';

const Settings = (props) => {
  const [t] = useTranslation();

  const i18 = (key) => {
    return t(key);
  };

  return (
    <View style={styles.container}>
      <MenuHeader title={i18('Settings.title')} {...props} />
      <View style={styles.buttonContainer}>
        <Text>{i18('Settings.title')}</Text>
      </View>
    </View>
  );
};

export default withTheme(Settings);
