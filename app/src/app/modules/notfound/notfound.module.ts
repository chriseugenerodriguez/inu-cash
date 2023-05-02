import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './notfound.component';
import { RouterModule, Routes } from '@angular/router';

// ROUTES
export const ROUTES: Routes = [
  { path: '', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    NotfoundComponent
  ]
})
export class NotfoundModule { }
