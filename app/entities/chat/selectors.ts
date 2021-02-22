import { RootState } from '../../store/reducers';

import { selectChatEntity } from '../../store/selectors';

export const selectChats = (state: RootState) => selectChatEntity(state).threads;

export const selectIsLoading = (state: RootState) => selectChatEntity(state).isLoading;
