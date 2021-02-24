/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from 'react-native-button';
import { Text, View, StyleSheet, Alert } from 'react-native';
// import { AppStyles } from '../AppStyles';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { screens } from '../../config';
import styles from './welcome.styles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Say hello to your new app</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => navigation.navigate(screens.login)}>
        Login
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => navigation.navigate(screens.register)}>
        Register
      </Button>
    </View>
  );
};

export default WelcomeScreen;
