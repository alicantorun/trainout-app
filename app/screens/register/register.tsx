/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Button from 'react-native-button';
// import { AppStyles } from '../AppStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';
// import { User } from '../interfaces/interfaces';
import { register } from '../../entities/auth/actions';
import styles from './register.styles';

const SignupScreen: React.FC = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const onRegisterButtonPress = () => {
    if (email.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }

    dispatch(register.request({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
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
        onPress={() => onRegisterButtonPress()}>
        Register
      </Button>
    </View>
  );
};

export default SignupScreen;
