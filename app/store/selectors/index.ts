import { RootState } from '../reducers';

export const selectRoot = (state: RootState) => state;

export const selectEntities = (state: RootState) => state.entities;

export const selectAuthEntity = (state: RootState) => selectEntities(state).auth;

export const selectChatEntity = (state: RootState) => selectEntities(state).chat;
