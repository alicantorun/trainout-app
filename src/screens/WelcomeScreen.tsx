/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from 'react-native-button';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {AppStyles} from '../AppStyles';
import {AsyncStorage, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';

const WelcomeScreen: React.FC = (props) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    const email = await AsyncStorage.getItem('@loggedInUserID:key');
    const password = await AsyncStorage.getItem('@loggedInUserID:password');
    const id = await AsyncStorage.getItem('@loggedInUserID:id');
    if (
      id != null &&
      id.length > 0 &&
      password != null &&
      password.length > 0
    ) {
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
              const {code, message} = error;
              Alert.alert(message);
            });
          setIsLoading(false);
        })
        .catch((error) => {
          const {code, message} = error;
          Alert.alert(message);
          // For details of error codes, see the docs
          // The message contains the default Firebase string
          // representation of the error
        });
      return;
    }
    const fbToken = await AsyncStorage.getItem(
      '@loggedInUserID:facebookCredentialAccessToken',
    );
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
        color={AppStyles.color.tint}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Say hello to your new app</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => navigation.navigate('StackNavigator')}>
        Login
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => navigation.navigate('StackNavigator')}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
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
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: AppStyles.color.tint,
  },
  spinner: {
    marginTop: 200,
  },
});

export default WelcomeScreen;
