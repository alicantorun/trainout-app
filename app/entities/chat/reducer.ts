import { getType } from 'typesafe-actions';

import * as Actions from './actions';

const initialState = {
  chatrooms: [],
  currentChatroom: undefined,
  messages: undefined,
  isLoading: false,
};

export default function (state = initialState, action: Actions.AuthActions) {
  switch (action.type) {
    case getType(Actions.createChatroom.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(Actions.createChatroom.success):
      return {
        ...state,
        isLoading: false,
      };
    case getType(Actions.createChatroom.failure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(Actions.getChatrooms.success):
      return {
        ...state,
        isLoading: false,
        chatrooms: action.payload,
      };
    case getType(Actions.getChatrooms.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(Actions.getChatrooms.failure):
      return {
        ...state,
        isLoading: true,
      };
    case getType(Actions.setCurrentChatroom):
      return {
        ...state,
        currentChatroom: action.payload,
      };
    case getType(Actions.getMessages.success):
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}
