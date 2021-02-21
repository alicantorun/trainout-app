import AsyncStorage from '@react-native-community/async-storage';
import { all, fork, put, take } from 'redux-saga/effects';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';
import * as Actions from './actions';
import * as RootNavigation from '../../RootNavigation';

GoogleSignin.configure({
  webClientId: '325900303912-7s7c58iahbcm94isl3m28kjg30dr0raa.apps.googleusercontent.com',
});

function* loginSaga({ payload }) {
  const { email, password } = payload;
  yield auth().signOut();
  try {
    const result = yield auth().signInWithEmailAndPassword(email, password);

    const user = result.user;
    let user_uid = user.uid;

    AsyncStorage.setItem('@loggedInUserID:id', user_uid);
    AsyncStorage.setItem('@loggedInUserID:key', email);
    AsyncStorage.setItem('@loggedInUserID:password', password);

    yield put(
      Actions.login.success({
        user: user,
        // token: accessToken,
      }),
    );

    // RootNavigation.navigate(screens.drawerStack);
  } catch (error) {
    Alert.alert(error);
    yield put(
      Actions.login.failure({
        error: error ? error : 'User login failed!',
      }),
    );
  }
}

function* logoutSaga() {
  try {
    yield auth().signOut();

    AsyncStorage.setItem('@loggedInUserID:id', null);
    AsyncStorage.setItem('@loggedInUserID:key', null);
    AsyncStorage.setItem('@loggedInUserID:password', null);

    // RootNavigation.navigate(screens.drawerStack);
  } catch (error) {
    Alert.alert(error);
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
        // token: accessToken,
      }),
    );

    // navigation.navigate('DrawerStack', { screen: 'Home' });
    // RootNavigation.navigate(screens.drawerStack);
  } catch (error) {
    yield put(
      Actions.facebookLogin.failure({
        error: error ? error : 'User login failed!',
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
        // token: idToken,
      }),
    );

    // navigation.navigate('')
  } catch (error) {
    yield put(
      Actions.googleLogin.failure({
        error: error ? error : 'User login failed!',
      }),
    );
  }
}

function* registerSaga({ payload }) {
  const { email, password } = payload;
  try {
    const result = yield auth().createUserWithEmailAndPassword(email, password);

    const user = result.user;

    AsyncStorage.setItem('@loggedInUserID:id', user.uid);
    AsyncStorage.setItem('@loggedInUserID:key', email);
    AsyncStorage.setItem('@loggedInUserID:password', password);

    // const userDict = {
    //   id: user.uid,
    //   fullname: fullname,
    //   email: email,
    //   photoURL: user.photoURL,
    // };

    // firestore().collection('users').doc(user.uid).set(userDict);

    yield put(Actions.register.success({ user }));
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

function* watchRegister() {
  while (true) {
    const action = yield take(Actions.register.request);
    yield* registerSaga(action);
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
function* watchLogout() {
  while (true) {
    yield take(Actions.logout);
    yield* logoutSaga();
  }
}

export default function* () {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFacebookLogin),
    fork(watchGoogleLogin),
    fork(watchRegister),
  ]);
}
