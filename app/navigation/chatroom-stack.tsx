import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { screens } from '../config';

import Chatroom from '../screens/chatroom';
import CreateChatRoom from '../screens/createChatroom';
import ChatroomHome from '../screens/chatroomHome';

const ChatroomStack = createStackNavigator();

export default function ChatroomNavigator() {
  return (
    <ChatroomStack.Navigator headerMode="none">
      <ChatroomStack.Screen name={screens.chatroomHome} component={ChatroomHome} />
      <ChatroomStack.Screen name={screens.createChatroom} component={CreateChatRoom} />
      <ChatroomStack.Screen name={screens.chatroom} component={Chatroom} />
    </ChatroomStack.Navigator>
  );
}
