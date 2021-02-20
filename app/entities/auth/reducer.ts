import { getType } from 'typesafe-actions';

import * as Actions from './actions';

const initialState = {
  pending: false,
  error: null,
  user: null,
  token: null,
};

export default function (state = initialState, action: Actions.AuthActions) {
  switch (action.type) {
    case getType(Actions.login.request):
      return {
        ...state,
        pending: true,
        error: null,
      };
    case getType(Actions.login.success):
      return {
        ...state,
        pending: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case getType(Actions.login.failure):
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case getType(Actions.register.request):
      return {
        ...state,
        pending: true,
        error: null,
      };
    case getType(Actions.register.success):
      return {
        ...state,
        pending: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case getType(Actions.register.failure):
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case getType(Actions.logout):
      return {
        ...state,
        pending: false,
        error: false,
        user: null,
        token: null,
      };
    case getType(Actions.facebookLogin.success):
      return {
        ...state,
        pending: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case getType(Actions.googleLogin.success):
      return {
        ...state,
        pending: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
