import { all } from 'redux-saga/effects';

import authEntity from '../../entities/auth/saga';
import chatEntity from '../../entities/chat/saga';

function* entities() {
  yield all([...authEntity(), ...chatEntity()]);
}

export default function* rootSaga() {
  yield all([...entities()]);
}
