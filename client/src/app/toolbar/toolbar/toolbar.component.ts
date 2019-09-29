import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { select, Store } from '@ngrx/store';
import { IUsersState } from '../../users/store/users.state';
import { selectCurrentUser } from '../../users/store/user.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  currentUser$ = this.store.pipe(
    select(selectCurrentUser)
  );

  constructor(protected store: Store<IUsersState>) { }

  get LINK_TO_GITHUB() {
    return environment.githubLink;
  }

  ngOnInit() {
  }

}
