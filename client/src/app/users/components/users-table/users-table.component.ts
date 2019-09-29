import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { IUsersState } from '../../store/users.state';
import { select, Store } from '@ngrx/store';
import { selectCurrentUserId, selectUsers, selectUsersSearch, selectUsersSelection } from '../../store/user.selectors';
import { AutoSubscription, AutoSubscriptions } from 'auto-subscriptions';
import { delay, filter, tap } from 'rxjs/operators';
import { IUser } from '../../user.model';
import * as userActions from '../../store/user.actions';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
@AutoSubscriptions()
export class UsersTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<IUser>;

  readonly DISPLAYED_COLUMNS: Array<'checkbox' | keyof IUser> = [
    'checkbox',
    'name',
    'ip',
    'isConnected',
    'resolution',
    'browser',
    'os',
    'lastSeen'
  ];

  users = [];
  selection = [];
  search: string;

  currentUserId$ = this.store.pipe(select(selectCurrentUserId));

  @AutoSubscription
  users$ = this.store.pipe(
    select(selectUsers),
    delay(0),
    tap((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    })
  );

  @AutoSubscription
  selection$ = this.store.pipe(
    select(selectUsersSelection),
    tap((selection) => {
      this.selection = selection;
    })
  );

  @AutoSubscription
  search$ = this.store.pipe(select(selectUsersSearch)).pipe(
    filter(() => Boolean(this.dataSource)),
    tap((search) => {
      this.search = search;
      this.applyFilter(search);
    })
  );

  constructor(protected store: Store<IUsersState>) {
  }

  toggleAll() {
    this.store.dispatch(userActions.toggleAll());
  }

  toggleOne(id): void {
    this.store.dispatch(userActions.toggleOne({ id }));
  }

  allChecked(): boolean {
    return this.selection.length === this.users.length;
  }

  isChecked(id): boolean {
    return this.selection.includes(id);
  }

  applyFilter(search: string): void {
    if (this.dataSource) {
      this.dataSource.filter = search.trim().toLowerCase();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
