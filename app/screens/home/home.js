import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import { MenuHeader } from '../../components';
import styles from './home.styles';
import Map from '../../components/Map.tsx';

const Home = (props) => {
  const [t] = useTranslation();

  const i18 = (key) => {
    return t(key);
  };

  return (
    <View style={styles.container}>
      <MenuHeader title={i18('Home.title')} {...props} />
      <View style={styles.buttonContainer}>
        <Map />
      </View>
    </View>
  );
};

export default withTheme(Home);
