import * as UserActions from './user.actions';
import { initialUsersState, usersAdapter } from './users.state';
import { createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  initialUsersState,
  on(UserActions.addAll, (state, { users }) => (
    usersAdapter.addAll(users, state))
  ),

  on(UserActions.addOne, (state, { user }) => (
    usersAdapter.addOne(user, state))
  ),

  on(UserActions.updateOne, (state, { id, changes }) => (
    usersAdapter.updateOne({ id, changes }, state))
  ),

  on(UserActions.toggleAll, (state) => {
    const { selection, ids } = state;
    return {
      ...state,
      selection: selection.length === ids.length ? [] : [...ids]
    };
  }),

  on(UserActions.toggleOne, (state, { id }) => {
    const { selection } = state;
    return {
      ...state,
      selection: selection.includes(id) ? selection.filter((sId) => sId !== id) : [...selection, id]
    };
  }),

  on(UserActions.setSearch, (state, { search }) => ({ ...state, search })),

  on(UserActions.setCurrentUserId, (state, { currentUserId }) => ({ ...state, currentUserId })),
);
