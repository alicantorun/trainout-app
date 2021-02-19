import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import { MenuHeader } from '../../components';
import styles from './profile.styles';

const Profile = (props) => {
  const [t] = useTranslation();

  const i18 = (key) => {
    return t(key);
  };

  return (
    <View style={styles.container}>
      <MenuHeader title={i18('Profile.title')} {...props} />
      <View style={styles.buttonContainer}>
        <Text>{i18('Profile.title')}</Text>
      </View>
    </View>
  );
};

export default withTheme(Profile);
