import AsyncStorage from '@react-native-community/async-storage';
import { all, call, cancel, fork, put, take, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as AuthSelectors from '../auth/selectors';
import * as ChatSelectors from '../chat/selectors';
import firestore from '@react-native-firebase/firestore';

import { Alert } from 'react-native';
import * as Actions from './actions';

function* createChatroomSaga({ payload }) {
  const { name } = payload;

  try {
    const result = yield firestore()
      .collection('CHATROOMS')
      .add({
        name,
        latestMessage: {
          text: `You have joined the room ${name}.`,
          createdAt: new Date().getTime(),
        },
      });

    yield result.collection('MESSAGES').add({
      text: `You have joined the room ${name}.`,
      createdAt: new Date().getTime(),
      system: true,
    });
  } catch (error) {
    // Alert.alert(error);
    // yield put(
    //   Actions.createChatroom.failure({
    //     error: error ? error : 'Message failed to send',
    //   }),
    // );
  }
}

function* sendMessageSaga({ payload }) {
  const message = payload;
  const text = message[0].text;

  const user = yield select(AuthSelectors.selectUser);
  const chatroom = yield select(ChatSelectors.selectCurrentChatroom);

  try {
    yield firestore()
      .collection('CHATROOMS')
      .doc(chatroom._id)
      .collection('MESSAGES')
      .add({
        text: text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          email: user.email,
        },
      });

    yield firestore()
      .collection('CHATROOMS')
      .doc(chatroom._id)
      .set(
        {
          latestMessage: {
            text: text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true },
      );
  } catch (error) {
    // Alert.alert(error);
    // yield put(
    //   Actions.sendMessage.failure({
    //     error: error ? error : 'Message failed to send',
    //   }),
    // );
    console.log(error);
  }
}

export function* listenToNewChatroom() {
  const incomingChatroomEventChannel = eventChannel((emit) => firestore().collection('CHATROOMS').onSnapshot(emit));

  yield fork(closeIncomingChatroomEventChannel, incomingChatroomEventChannel);

  while (true) {
    const querySnapshot = yield take(incomingChatroomEventChannel);
    const chatrooms = querySnapshot?.docs?.map((documentSnapshot) => {
      return {
        _id: documentSnapshot.id,
        name: '',
        latestMessage: {
          text: '',
        },
        ...documentSnapshot.data(),
      };
    });
    yield put(Actions.getChatrooms.success(chatrooms));
  }
}

function* closeIncomingChatroomEventChannel(incomingChatroomEventChannel) {
  while (true) {
    yield take(Actions.stopGetChatrooms);
    incomingChatroomEventChannel.close();
  }
}

export function* watchIncomingChatrooms() {
  while (true) {
    const incomingChatroomChannel = yield takeEvery(Actions.getChatrooms.request, listenToNewChatroom);
    yield take(Actions.stopGetChatrooms);
    yield cancel(incomingChatroomChannel);
  }
}

export function* listenToMessages() {
  const chatroom = yield select(ChatSelectors.selectCurrentChatroom);

  const incomingMessagesEventChannel = eventChannel((emit) =>
    firestore()
      .collection('CHATROOMS')
      .doc(chatroom._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(emit),
  );

  yield fork(closeIncomingMessagesEventChannel, incomingMessagesEventChannel);

  while (true) {
    const querySnapshot = yield take(incomingMessagesEventChannel);
    const messages = querySnapshot?.docs.map((documentSnapshot) => {
      const firebaseData = documentSnapshot.data();

      const data = {
        _id: documentSnapshot.id,
        text: '',
        createdAt: new Date().getTime(),
        ...firebaseData,
      };

      if (!firebaseData.system) {
        data.user = {
          ...firebaseData.user,
          name: firebaseData.user.email,
        };
      }

      return data;
    });

    console.log(messages);

    yield put(Actions.getMessages.success(messages));
  }
}

function* closeIncomingMessagesEventChannel(incomingMessagesEventChannel) {
  while (true) {
    yield take(Actions.stopGetMessages);
    incomingMessagesEventChannel.close();
  }
}

export function* watchIncomingMessages() {
  while (true) {
    const incomingMessagesChannel = yield takeEvery(Actions.getMessages.request, listenToMessages);
    yield take(Actions.stopGetMessages);
    yield cancel(incomingMessagesChannel);
  }
}

export default function* () {
  yield all([
    takeEvery(Actions.createChatroom.request, createChatroomSaga),
    takeEvery(Actions.sendMessage.request, sendMessageSaga),
    watchIncomingChatrooms(),
    watchIncomingMessages(),
  ]);
}
