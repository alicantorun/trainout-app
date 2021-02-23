import AsyncStorage from '@react-native-community/async-storage';
import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import firestore from '@react-native-firebase/firestore';

import { Alert } from 'react-native';
import * as Actions from './actions';
import * as RootNavigation from '../../RootNavigation';

function* createChatroomSaga({ payload }) {
  const { name } = payload;

  try {
    const result = yield firestore()
      .collection('THREADS')
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
    Alert.alert(error);
    yield put(
      Actions.createChatRoom.failure({
        error: error ? error : 'Message failed to send',
      }),
    );
  }
}

function* getChatsSaga({ payload }) {
  console.log('CHANNEL ACTIVATED');
  const ref = firestore().collection('THREADS');
  const channel = eventChannel((emit) => ref.onSnapshot(emit));

  try {
    while (true) {
      const data = yield take(channel);
      const threads = data.docs.map((documentSnapshot) => {
        return {
          _id: documentSnapshot.id,
          name: '',
          latestMessage: {
            text: '',
          },
          ...documentSnapshot.data(),
        };
      });

      yield put(Actions.getChats.success(threads));
      console.log('CHANNEL UPDATED');
    }
  } finally {
    channel.close();
    console.log('CHANNEL CANCELLED');
  }
}

// saga
function todosChannel() {
  // firebase database ref
  const ref = firestore().collection('THREADS');

  const channel = eventChannel((emit) => ref.onSnapshot(emit));

  return channel;
}

function* sync() {
  const channel = yield call(todosChannel);

  yield fork(function* () {
    yield take(Actions.stopGettingChats);
    channel.close();
  });

  try {
    while (true) {
      yield takeEvery(channel, function* (value: any) {
        const threads = value?.docs?.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        console.log('threads', threads);
        yield put(Actions.getChats.success({ threads }));
      });
      // console.log('VALUE', value);
      // yield put(actions.syncTodos(value));
    }
  } catch (error) {
    // yield put(actions.cancelWatch()); // to emit 'CANCEL_WATCH'
    // yield put(actions.errorTodos(error));
  }

  // yield takeEvery(channel, function* (value: any) {
  //   const threads = value?.docs?.map((documentSnapshot) => {
  //     return {
  //       _id: documentSnapshot.id,
  //       name: '',
  //       latestMessage: {
  //         text: '',
  //       },
  //       ...documentSnapshot.data(),
  //     };
  //   });

  //   console.log('threads', threads);
  //   yield put(Actions.getChats.success({ threads }));
  // });

  // yield take(Actions.stopGettingChats);
  // channel.close();
}

export function* listenToNewMessages(action) {
  console.log('CHANNEL ACTIVATED');
  const ref = firestore().collection('THREADS');
  const channel = eventChannel((emit) => ref.onSnapshot(emit));

  const incomingMessageEventChannel = channel;

  // fork for closing the channel
  yield fork(closeIncomingMessageEventChannel, incomingMessageEventChannel);

  while (true) {
    const item = yield take(incomingMessageEventChannel);
    console.log('alicaaananana', item);
    const threads = item?.docs?.map((documentSnapshot) => {
      return {
        _id: documentSnapshot.id,
        name: '',
        latestMessage: {
          text: '',
        },
        ...documentSnapshot.data(),
      };
    });
    console.log(' alicanaaaa', threads);
    yield put(Actions.getChats.success(threads));
  }
}

function* closeIncomingMessageEventChannel(incomingMessageEventChannel) {
  while (true) {
    yield take(Actions.stopGettingChats);
    incomingMessageEventChannel.close();
  }
}

export function* watchIncomingMessages() {
  const incomingMessageChannel = yield takeEvery(Actions.getChats.request, listenToNewMessages);
  yield take(Actions.stopGettingChats);
  yield cancel(incomingMessageChannel);
}

export default function* () {
  // yield fork(Actions.getChats.request, sync);

  yield all([
    // takeEvery(Actions.createChatRoom.request, createChatroomSaga),
    // takeLatest(Actions.getChats.request, getChatsSaga),
    // startStopChannel(),
    watchIncomingMessages(),
  ]);
}
