import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUser } from '../user.model';

export const USERS_KEY = 'users';

export const usersAdapter = createEntityAdapter<IUser>();

export interface IUsersState extends EntityState<IUser> {
  selection: Array<string | number>;
  search: string;
  currentUserId: string;
}

export const initialUsersState: IUsersState = usersAdapter.getInitialState({
  selection: [],
  search: '',
  currentUserId: '',
});
