import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import Loading from '../../components/Loading';
import FormButton from '../../components/FormButton';
import { screens } from '../../config';
import styles from './chatroomHome.styles';
import * as ChatActions from '../../entities/chat/actions';
import * as ChatSelectors from '../../entities/chat/selectors';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const chatrooms = useSelector(ChatSelectors.selectChats);
  const isLoading = useSelector(ChatSelectors.selectIsLoading);

  useEffect(() => {
    dispatch(ChatActions.getChatrooms.request({}));

    return () => {
      dispatch(ChatActions.stopGetChatrooms());
    };
  }, []);

  const handlePress = (item) => {
    dispatch(ChatActions.setCurrentChatroom(item));
    navigation.navigate(screens.chatroom);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log('mount chat');

  return (
    <View style={styles.container}>
      <Text>CHAT HOME</Text>
      <FormButton modeValue="contained" title="Add Room" onPress={() => navigation.navigate(screens.createChatroom)} />
      <FlatList
        data={chatrooms as any}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider accessibilityComponentType={Divider} accessibilityTraits={Divider} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handlePress(item);
            }}
            // () =>
          >
            <List.Item
              accessibilityComponentType={List}
              accessibilityTraits={List}
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
