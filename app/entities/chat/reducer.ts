import { getType } from 'typesafe-actions';

import * as Actions from './actions';

const initialState = {
  threads: [],
  isLoading: false,
};

export default function (state = initialState, action: Actions.AuthActions) {
  switch (action.type) {
    case getType(Actions.createChatRoom.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(Actions.createChatRoom.success):
      return {
        ...state,
        isLoading: false,
      };
    case getType(Actions.createChatRoom.failure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(Actions.getChats.success):
      return {
        ...state,
        isLoading: false,
        threads: action.payload,
      };
    case getType(Actions.getChats.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(Actions.getChats.failure):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
