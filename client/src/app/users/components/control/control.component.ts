import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUsersSearch } from '../../store/user.selectors';
import { IUsersState } from '../../store/users.state';
import * as userActions from '../../store/user.actions';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  search$ = this.store.pipe(select(selectUsersSearch));

  constructor(protected store: Store<IUsersState>) {
  }

  onChangeSearch($event: string) {
    this.store.dispatch(userActions.setSearch({ search: $event }));
  }

}
