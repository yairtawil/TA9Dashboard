import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.model';

export const addAll = createAction(
  '[USERS] Add All',
  props<{ users: IUser[] }>()
);

export const addOne = createAction(
  '[USERS] Add One',
  props<{ user: IUser }>()
);

export const updateOne = createAction(
  '[USERS] Update One',
  props<{ id: string, changes: Partial<IUser> }>()
);

export const toggleOne = createAction(
  '[USERS] Toggle One',
  props<{ id: string }>()
);

export const toggleAll = createAction(
  '[USERS] Toggle All'
);

export const setSearch = createAction(
  '[USERS] Set Search',
  props<{ search: string }>()
);

export const setCurrentUserId = createAction(
  '[USERS] Set Current User Id',
  props<{ currentUserId: string }>()
);
