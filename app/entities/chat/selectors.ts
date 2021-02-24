import { RootState } from '../../store/reducers';

import { selectChatEntity } from '../../store/selectors';

export const selectChats = (state: RootState) => selectChatEntity(state).chatrooms;

export const selectIsLoading = (state: RootState) => selectChatEntity(state).isLoading;

export const selectCurrentChatroom = (state: RootState) => selectChatEntity(state).currentChatroom;

export const selectMessages = (state: RootState) => selectChatEntity(state).messages;
