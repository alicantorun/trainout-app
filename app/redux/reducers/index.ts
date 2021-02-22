import { combineReducers } from 'redux';
import authEntity from '../../entities/auth/reducer';
import chatEntity from '../../entities/chat/reducer';

export const rootReducer = combineReducers({
  entities: combineReducers({
    auth: authEntity,
    chat: chatEntity,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
