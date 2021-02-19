/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from 'react-native-button';
import { Text, View, StyleSheet, Alert } from 'react-native';
// import { AppStyles } from '../AppStyles';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { screens } from '../../config';
import styles from './welcome.styles';

const WelcomeScreen = (props) => {
  // const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    const email = await AsyncStorage.getItem('@loggedInUserID:key');
    const password = await AsyncStorage.getItem('@loggedInUserID:password');
    const id = await AsyncStorage.getItem('@loggedInUserID:id');
    if (id != null && id.length > 0 && password != null && password.length > 0) {
      auth()
        // TOOO
        .signInWithEmailAndPassword(email as any, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(id)
            .get()
            // TODO
            .then(function (doc: any) {
              const dict = {
                id: id,
                email: email,
                profileURL: doc.photoURL,
                fullname: doc.displayName,
              };
              if (doc.exists) {
                // navigation.dispatch({
                //   type: 'Login',
                //   user: dict,
                // });
              }
            })
            .catch(function (error) {
              const { code, message } = error;
              Alert.alert(message);
            });
          setIsLoading(false);
        })
        .catch((error) => {
          const { code, message } = error;
          Alert.alert(message);
          // For details of error codes, see the docs
          // The message contains the default Firebase string
          // representation of the error
        });
      return;
    }
    const fbToken = await AsyncStorage.getItem('@loggedInUserID:facebookCredentialAccessToken');
    if (id != null && id.length > 0 && fbToken != null && fbToken.length > 0) {
      const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
      auth()
        .signInWithCredential(credential)
        .then((result) => {
          const user = result.user;
          const userDict = {
            id: user.uid,
            fullname: user.displayName,
            email: user.email,
            profileURL: user.photoURL,
          };
          // this.props.navigation.dispatch({
          //   type: 'Login',
          //   user: userDict,
          // });
        })
        .catch((error) => {
          setIsLoading(false);
        });
      return;
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        //   color={AppStyles.color.tint}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Say hello to your new app</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate(screens.login)}>
        Login
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => props.navigation.navigate(screens.register)}>
        Register
      </Button>
    </View>
  );
};

export default WelcomeScreen;
