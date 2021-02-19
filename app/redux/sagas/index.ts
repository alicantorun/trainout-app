import { all } from 'redux-saga/effects';

import authEntity from '../../entities/auth/saga';

function* entities() {
  yield all([...authEntity()]);
}

export default function* rootSaga() {
  yield all([...entities()]);
}
