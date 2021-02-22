import AsyncStorage from '@react-native-community/async-storage';
import { all, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import firestore from '@react-native-firebase/firestore';

import { Alert } from 'react-native';
import * as Actions from './actions';
import * as RootNavigation from '../../RootNavigation';

function* createChatroomSaga({ payload }) {
  const { name } = payload;

  try {
    /**
     * Create a new Firestore collection to save THREADS
     */
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

    // RootNavigation.navigate(screens.drawerStack);
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
          // give defaults
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

  // RootNavigation.navigate(screens.drawerStack);
}

export default function* () {
  yield all([
    takeEvery(Actions.createChatRoom.request, createChatroomSaga),
    takeLatest(Actions.getChats.request, getChatsSaga),

    startStopChannel(),
  ]);
}

// import firebase from 'react-native-firebase';
// const RSF = new ReduxSagaFirebase(firebase);
// export function* watchSquadChannel(userData) {
//   try {
//     yield put(syncSquadLoading());
//     const channel = RSF.firestore.channel('collectionName/documentName', 'document');
//     while (true) {
//       const response = yield take(channel);
//       const {
//         _data: {
//           event: { data },
//         },
//       } = response;
//       yield put(syncSquadSuccess(data));
//     }
//   } catch (error) {
//     yield put(syncSquadFailure(error));
//   }
// }
