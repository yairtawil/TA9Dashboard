import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';
import { ControlComponent } from './components/control/control.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { USERS_KEY } from './store/users.state';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UsersComponent, ControlComponent, UsersTableComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    StoreModule.forFeature(USERS_KEY, userReducer),
  ]
})
export class UsersModule { }
