import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ParallaxModule } from 'ngx-parallax';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    CarouselModule,
    ParallaxModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
