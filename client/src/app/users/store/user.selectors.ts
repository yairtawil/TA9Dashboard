import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsersState, USERS_KEY, usersAdapter } from './users.state';

const { selectAll, selectIds } = usersAdapter.getSelectors();

export const selectUsersFeature = createFeatureSelector<IUsersState>(USERS_KEY);
export const selectUsers = createSelector(selectUsersFeature, selectAll);
export const selectUsersIds = createSelector(selectUsersFeature, selectIds);
export const selectUsersSelection = createSelector(selectUsersFeature, (state) => state.selection);
export const selectUsersSearch = createSelector(selectUsersFeature, (state) => state.search);
export const selectCurrentUserId = createSelector(selectUsersFeature, (state) => state.currentUserId);
export const selectCurrentUser = createSelector(selectUsersFeature, (state) => state.entities[state.currentUserId]);
