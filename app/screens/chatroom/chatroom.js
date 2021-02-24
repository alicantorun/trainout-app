import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';

import { ActivityIndicator, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';

import * as ChatActions from '../../entities/chat/actions';
import * as ChatSelectors from '../../entities/chat/selectors';
import * as AuthSelectors from '../../entities/auth/selectors';

import styles from './chatroom.styles';

export default function RoomScreen({ route }) {
  const dispatch = useDispatch();

  const chatroom = useSelector(ChatSelectors.selectCurrentChatroom);
  const messages = useSelector(ChatSelectors.selectMessages);

  const user = useSelector(AuthSelectors.selectUser);
  console.log(user);

  useEffect(() => {
    dispatch(ChatActions.getMessages.request());
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return <SystemMessage {...props} wrapperStyle={styles.systemMessageWrapper} textStyle={styles.systemMessageText} />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={() => {
        dispatch(ChatActions.sendMessage.request(messages));
      }}
      user={{ _id: user.uid }}
      placeholder="Type your message here..."
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
}
