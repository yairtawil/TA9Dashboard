import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../users/store/user.selectors';
import { IUsersState } from '../../users/store/users.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser$ = this.store.pipe(
    select(selectCurrentUser)
  );

  constructor(protected store: Store<IUsersState>) { }

  ngOnInit() {
  }

}
