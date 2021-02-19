import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export const login = createAsyncAction(
  'entities/auth/login/request',
  'entities/auth/login/success',
  'entities/auth/login/failure',
)<{ email: string; password: string }, { user: any; token: any }, { error: Error }>();

export const logout = createAction('entities/auth/logout/request')();

export const register = createAsyncAction(
  'entities/auth/login/request',
  'entities/auth/login/success',
  'entities/auth/login/failure',
)<{ email: string; password: string }, { user: any; token: any }, { error: Error }>();

export const facebookLogin = createAsyncAction(
  'entities/auth/facebook-login/request',
  'entities/auth/facebook-login/success',
  'entities/auth/facebook-login/failure',
)<{}, { user: any; token: any }, { error: Error }>();

export const googleLogin = createAsyncAction(
  'entities/auth/google-login/request',
  'entities/auth/google-login/success',
  'entities/auth/google-login/failure',
)<{}, { user: any; token: any }, { error: Error }>();

export const setCurrentUser = createAction('enitites/auth/current-user/set')<{
  user: any;
}>();

export type AuthActions = ActionType<
  typeof login | typeof logout | typeof register | typeof facebookLogin | typeof googleLogin | typeof setCurrentUser
>;
