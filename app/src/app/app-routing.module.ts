import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';

const R: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(R)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
