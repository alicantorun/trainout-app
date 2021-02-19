/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {AsyncStorage} from 'react-native';
const FBSDK = require('react-native-fbsdk');

import {useNavigation} from '@react-navigation/core';
import {Screen, enableScreens} from 'react-native-screens';

enableScreens();

const {LoginManager, AccessToken} = FBSDK;

GoogleSignin.configure({
  webClientId:
    '325900303912-7s7c58iahbcm94isl3m28kjg30dr0raa.apps.googleusercontent.com',
});

const LoginScreen: React.FC = (props) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLoginButtonPress = async () => {
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

  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        Alert.alert('Whoops!', 'You cancelled the sign in.');
      }

      const {accessToken} = await AccessToken.getCurrentAccessToken();

      if (!accessToken) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        accessToken,
      );

      const {user} = await auth().signInWithCredential(facebookCredential);

      AsyncStorage.setItem(
        '@loggedInUserID:facebookCredentialAccessToken',
        accessToken,
      );
      AsyncStorage.setItem('@loggedInUserID:id', user.uid);
      const userDict = {
        id: user.uid,
        fullname: user.displayName,
        email: user.email,
        profileURL: user.photoURL,
      };
      const data = {
        ...userDict,
        appIdentifier: 'rn-android-universal-listings',
      };
      firestore().collection('users').doc(user.uid).set(data);
      // this.props.navigation.dispatch({
      //   type: 'Login',
      //   user: userDict,
      // });
      navigation.navigate('DrawerStack', {screen: 'Home'});
    } catch (error) {
      Alert.alert('Please try again! ' + error);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      AsyncStorage.setItem(
        '@loggedInUserID:googleCredentialAccessToken',
        idToken,
      );

      const {user} = await auth().signInWithCredential(googleCredential);

      AsyncStorage.setItem('@loggedInUserID:id', user.uid);
      const userDict = {
        id: user.uid,
        fullname: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      const data = {
        ...userDict,
        appIdentifier: 'rn-android-universal-listings',
      };
      firestore().collection('users').doc(user.uid).set(data);
      // this.props.navigation.navigate('DrawerStack', {
      //   screen: 'Home',
      // });
      // navigation.navigate('')
    } catch (error) {
      Alert.alert('Please try again! ' + error);
    }
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
          placeholderTextColor={AppStyles.color.grey}
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
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onLoginButtonPress()}>
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
          style={{marginTop: 30}}
          size="large"
          animating={isLoading}
          color={AppStyles.color.tint}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  googleContainer: {
    width: 192,
    height: 48,
    marginTop: 30,
  },
  googleText: {
    color: AppStyles.color.white,
  },
});

export default LoginScreen;
