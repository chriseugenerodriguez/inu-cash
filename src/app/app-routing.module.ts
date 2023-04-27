import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: '404', loadChildren: () => import('./modules/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: 'buy', loadChildren: () => import('./modules/buy/buy.module').then(m => m.BuyModule) },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
