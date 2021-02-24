import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export const createChatroom = createAsyncAction(
  'entities/chat/create-chat-room/request',
  'entities/chat/create-chat-room/success',
  'entities/chat/create-chat-room/failure',
)<{ name: string }, {}, { error: Error }>();

export const sendMessage = createAsyncAction(
  'entities/chat/send-message/request',
  'entities/chat/send-message/success',
  'entities/chat/send-message/failure',
)<{ message: any }, {}, { error: Error }>();

export const getMessages = createAsyncAction(
  'entities/chat/get-messages/request',
  'entities/chat/get-messages/success',
  'entities/chat/get-messages/failure',
)<{}, { message: any }, { error: Error }>();

export const getChatrooms = createAsyncAction(
  'entities/chat/get-chatrooms/request',
  'entities/chat/get-chatrooms/success',
  'entities/chat/get-chatrooms/failure',
)<{}, { chatrooms: any }, { error: Error }>();

export const stopGetChatrooms = createAction('entities/chat/stop-get-chatroom')();

export const stopGetMessages = createAction('entities/chat/stop-get-messages')();

export const setCurrentChatroom = createAction('entities/chat/set-current-chatroom')<{ chatroom: any }>();

export type AuthActions = ActionType<
  typeof createChatroom | typeof getChatrooms | typeof stopGetChatrooms | typeof setCurrentChatroom | typeof getMessages
>;
