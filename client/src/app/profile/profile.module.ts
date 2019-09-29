import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule } from '@angular/material';



@NgModule({
  declarations: [ProfileComponent],
  exports: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class ProfileModule { }
