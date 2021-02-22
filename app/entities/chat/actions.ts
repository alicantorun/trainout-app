import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export const createChatRoom = createAsyncAction(
  'entities/chat/create-chat-room/request',
  'entities/chat/create-chat-room/success',
  'entities/chat/create-chat-room/failure',
)<{ name: string }, {}, { error: Error }>();

export const getChats = createAsyncAction(
  'entities/chat/get-threads/request',
  'entities/chat/get-threads/success',
  'entities/chat/get-threads/failure',
)<{}, { threads: any }, { error: Error }>();

export const stopGettingChats = createAction('entities/auth/stop-getting-chats')();

export type AuthActions = ActionType<typeof createChatRoom | typeof getChats | typeof stopGettingChats>;
