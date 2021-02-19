import { combineReducers } from 'redux';
import authEntity from '../../entities/auth/reducer';

export const rootReducer = combineReducers({
  entities: combineReducers({
    auth: authEntity,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
