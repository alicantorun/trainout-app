import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import useStatsBar from '../../utils/useStatusBar';

import styles from './createChatroom.styles';
import { createChatRoom } from '../../entities/chat/actions';

export default function AddRoomScreen({ navigation }) {
  useStatsBar('dark-content');
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState('');

  function handleButtonPress() {
    if (roomName.length > 0) {
      dispatch(createChatRoom.request({ name: roomName }));
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          accessibilityComponentType={IconButton}
          accessibilityTraits={IconButton}
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}
