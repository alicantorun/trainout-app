import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';
import useStatsBar from '../../utils/useStatusBar';
import FormButton from '../../components/FormButton';
import { screens } from '../../config';
import styles from './chatroomHome.styles';
import { getChats, stopGettingChats } from '../../entities/chat/actions';
import { selectChats, selectIsLoading } from '../../entities/chat/selectors';

export default function HomeScreen({ navigation }) {
  useStatsBar('light-content');

  const dispatch = useDispatch();
  const threads = useSelector(selectChats);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getChats.request());

    return () => {
      console.log('un moiunting');
      stopGettingChats();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text>CHAT HOME</Text>
      <FormButton modeValue="contained" title="Add Room" onPress={() => navigation.navigate(screens.createChatroom)} />
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(screens.chatroom, { thread: item })}>
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
