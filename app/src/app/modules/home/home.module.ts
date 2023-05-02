import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ParallaxModule } from 'ngx-parallax';
// ROUTES
export const ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TabsModule.forRoot(),
    CarouselModule,
    ParallaxModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
