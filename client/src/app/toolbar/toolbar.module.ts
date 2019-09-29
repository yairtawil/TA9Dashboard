import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ToolbarModule {
}
