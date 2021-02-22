import { RootState } from '../../redux/reducers';

import { selectChatEntity } from '../../redux/selectors';

export const selectChats = (state: RootState) => selectChatEntity(state).threads;

export const selectIsLoading = (state: RootState) => selectChatEntity(state).isLoading;
