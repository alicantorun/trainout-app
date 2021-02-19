import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';

import Chatroom from '../screens/chatroom';
import CreateChatRoom from '../screens/createChatRoom';
import ChatroomHome from '../screens/chatroomHome';

const ChatStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <ChatStack.Navigator headerMode="none">
      <ChatStack.Screen name={screens.chatroomHome} component={ChatroomHome} />
      <ChatStack.Screen name={screens.createChatroom} component={CreateChatRoom} />
      <ChatStack.Screen name={screens.chatroom} component={Chatroom} />
    </ChatStack.Navigator>
  );
}
