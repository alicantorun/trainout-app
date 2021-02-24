import { all, fork, put, take } from 'redux-saga/effects';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';
import * as Actions from './actions';

function* loginSaga({ payload }) {
  const { email, password } = payload;

  try {
    const { user } = yield auth().signInWithEmailAndPassword(email, password);
    yield put(
      Actions.login.success({
        user: user,
      }),
    );
  } catch (error) {
    console.log(error);
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

    yield put(Actions.facebookLogin.success({ user }));
  } catch (error) {
    console.log(error);
  }
}

function* googleLoginSaga({}) {
  try {
    const { idToken } = yield GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const { user } = yield auth().signInWithCredential(googleCredential);

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

    yield put(Actions.googleLogin.success({ user }));
  } catch (error) {
    yield put(
      Actions.googleLogin.failure({
        error: error ? error : 'User login failed!',
      }),
    );
  }
}

function* registerSaga({ payload }) {
  const { email, password, name, surname } = payload;
  try {
    const { user } = yield auth().createUserWithEmailAndPassword(email, password);

    const userDict = {
      id: user._user.uid,
      fullname: `${name} ${surname}`,
      email: email,
      photoURL: null,
    };

    const data = {
      ...userDict,
      appIdentifier: 'rn-android-universal-listings',
    };

    firestore().collection('users').doc(user.uid).set(data);

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
