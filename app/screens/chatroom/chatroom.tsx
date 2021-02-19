// Login.js
import React from 'react';
import { View, Text } from 'react-native';

import styles from './chatroom.styles';

export default function ChatRoom() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You haven't joined any chat rooms yet :'(</Text>
    </View>
  );
}
