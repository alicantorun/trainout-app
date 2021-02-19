/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import Button from 'react-native-button';
// import { AppStyles } from '../AppStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { AsyncStorage } from 'react-native';
const FBSDK = require('react-native-fbsdk');

import { facebookLogin, googleLogin } from '../../entities/auth/actions';

import { useNavigation } from '@react-navigation/core';
import { Screen, enableScreens } from 'react-native-screens';

import { screens } from '../../config';

import styles from './login.styles';

enableScreens();

const { LoginManager, AccessToken } = FBSDK;

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLoginButtonPress = async () => {
    // TODO
    // props.navigation.navigate(screens.drawerStack);

    // return;

    if (email.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }

    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      const user = result.user;
      let user_uid = user.uid;
      AsyncStorage.setItem('@loggedInUserID:id', user_uid);
      AsyncStorage.setItem('@loggedInUserID:key', email);
      AsyncStorage.setItem('@loggedInUserID:password', password);

      // navigation.dispatch({
      //   type: 'Login',
      //   user,
      // });
      // navigation.navigate('')
    } catch (error) {
      Alert.alert('Please try again! ' + error);
    }
  };

  const onFacebookButtonPress = () => {
    dispatch(facebookLogin.request({}));
  };

  const onGoogleButtonPress = () => {
    dispatch(googleLogin.request({}));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or phone number"
          onChangeText={(text) => setEmail(text)}
          value={email}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button containerStyle={styles.loginContainer} style={styles.loginText} onPress={() => onLoginButtonPress()}>
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
        onPress={() => onFacebookButtonPress()}>
        Login with Facebook
      </Button>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          size="large"
          animating={isLoading}
          //   color={AppStyles.color.tint}
        />
      ) : (
        <GoogleSigninButton
          style={styles.googleContainer}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => {
            onGoogleButtonPress();
          }}
        />
      )}
    </View>
  );
};

export default LoginScreen;
