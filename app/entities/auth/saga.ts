import AsyncStorage from '@react-native-community/async-storage';
import { all, call, fork, put, take } from 'redux-saga/effects';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';
import * as Actions from './actions';
import * as RootNavigation from '../../RootNavigation';
import { screens } from '../../config';

import { login, register } from './api';

GoogleSignin.configure({
  webClientId: '325900303912-7s7c58iahbcm94isl3m28kjg30dr0raa.apps.googleusercontent.com',
});

function* loginSaga({ payload }) {
  try {
    const response = yield call(login, payload);
    if (response.success) {
      AsyncStorage.setItem('@token', response.success.token);

      const user = {
        ...response.user,
      };

      const token = { token: response.success.token };

      yield put(Actions.login.success({ user, token }));
    }
  } catch (err) {
    yield put(
      Actions.login.failure({
        error: err ? err : 'User login failed!',
      }),
    );
  }
}

function* facebookLoginSaga({}) {
  try {
    const result = yield LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      Alert.alert('Whoops!', 'You cancelled the sign in.');
    }

    const { accessToken } = yield AccessToken.getCurrentAccessToken();

    if (!accessToken) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);

    const { user } = yield auth().signInWithCredential(facebookCredential);

    console.log(user);

    AsyncStorage.setItem('@loggedInUserID:facebookCredentialAccessToken', accessToken);
    AsyncStorage.setItem('@loggedInUserID:id', user.uid);
    const userDict = {
      id: user.uid,
      fullname: user.displayName,
      email: user.email,
      profileURL: user.photoURL,
    };
    const data = {
      ...userDict,
      appIdentifier: 'rn-android-universal-listings',
    };
    firestore().collection('users').doc(user.uid).set(data);

    yield put(
      Actions.facebookLogin.success({
        user: user,
        token: accessToken,
      }),
    );
    // this.props.navigation.dispatch({
    //   type: 'Login',
    //   user: userDict,
    // });
    // navigation.navigate('DrawerStack', { screen: 'Home' });
    RootNavigation.navigate(screens.drawerStack);
  } catch (err) {
    yield put(
      Actions.facebookLogin.failure({
        error: err ? err : 'User login failed!',
      }),
    );
  }
}

function* googleLoginSaga({}) {
  try {
    const { idToken } = yield GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    AsyncStorage.setItem('@loggedInUserID:googleCredentialAccessToken', idToken);

    const { user } = yield auth().signInWithCredential(googleCredential);

    AsyncStorage.setItem('@loggedInUserID:id', user.uid);
    const userDict = {
      id: user.uid,
      fullname: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    const data = {
      ...userDict,
      appIdentifier: 'rn-android-universal-listings',
    };
    firestore().collection('users').doc(user.uid).set(data);

    yield put(
      Actions.googleLogin.success({
        user: user,
        token: idToken,
      }),
    );
    // this.props.navigation.navigate('DrawerStack', {
    //   screen: 'Home',
    // });
    // navigation.navigate('')
  } catch (err) {
    yield put(
      Actions.googleLogin.failure({
        error: err ? err : 'User login failed!',
      }),
    );
  }
}

function* registerSaga({ payload }) {
  try {
    const response = yield call(register, payload);
    if (response.success) {
      AsyncStorage.setItem('@token', response.success.token);

      const user = {
        ...response.user,
      };

      const token = { token: response.success.token };

      yield put(Actions.register.success({ user, token }));
    }
  } catch (error) {
    yield put(
      Actions.register.failure({
        error: error ? error : 'User register failed',
      }),
    );
  }
}

function* watchLogin() {
  while (true) {
    const action = yield take(Actions.login.request);
    yield* loginSaga(action);
  }
}
function* watchFacebookLogin() {
  while (true) {
    const action = yield take(Actions.facebookLogin.request);
    yield* facebookLoginSaga(action);
  }
}
function* watchGoogleLogin() {
  while (true) {
    const action = yield take(Actions.googleLogin.request);
    yield* googleLoginSaga(action);
  }
}

function* watchRegister() {
  while (true) {
    const action = yield take(Actions.register.request);
    yield* registerSaga(action);
  }
}

export default function* () {
  yield all([fork(watchLogin), fork(watchFacebookLogin), fork(watchGoogleLogin), fork(watchRegister)]);
}
