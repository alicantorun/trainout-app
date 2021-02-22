import { RootState } from '../../store/reducers';

import { selectAuthEntity } from '../../store/selectors';

export const selectUser = (state: RootState) => selectAuthEntity(state).user;

export const selectToken = (state: RootState) => selectAuthEntity(state).token;
