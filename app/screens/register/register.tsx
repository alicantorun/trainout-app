/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Button from 'react-native-button';
// import { AppStyles } from '../AppStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/core';
import { AsyncStorage } from 'react-native';
// import { User } from '../interfaces/interfaces';

import styles from './register.styles';

const SignupScreen: React.FC = (props) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(true);
  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);

  const authSubscription = () => {
    auth().onAuthStateChanged((user) => {
      setIsLoading(false);
      setUser(user);
    });
  };

  React.useEffect(() => {
    authSubscription();

    return () => authSubscription();
  }, []);

  const onRegisterButtonPressed = async () => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);

      const user = result.user;

      console.log(result);
      AsyncStorage.setItem('@loggedInUserID:id', user.uid);
      AsyncStorage.setItem('@loggedInUserID:key', email);
      AsyncStorage.setItem('@loggedInUserID:password', password);

      const userDict = {
        id: user.uid,
        fullname: fullname,
        email: email,
        photoURL: user.photoURL,
      };

      firestore().collection('users').doc(user.uid).set(userDict);
      // this.props.navigation.dispatch({
      //   type: 'Login',
      //   userDict,
      // });
    } catch (error) {
      Alert.alert('Please try again! ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Full Name"
          onChangeText={(text) => setFullname(text)}
          value={fullname}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          //   placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
        style={styles.facebookText}
        onPress={() => onRegisterButtonPressed()}>
        Register
      </Button>
    </View>
  );
};

export default SignupScreen;
