import { RootState } from '../reducers';

const selectEntities = (state: RootState) => state.entities;

export const selectAuthEntity = (state: RootState) => selectEntities(state).auth;
