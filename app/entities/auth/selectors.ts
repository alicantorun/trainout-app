import { RootState } from '../../redux/reducers';

import { selectAuthEntity } from '../../redux/selectors';

export const selectUser = (state: RootState) => selectAuthEntity(state).user;

export const selectToken = (state: RootState) => selectAuthEntity(state).token;
