import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// #TODO - import heroes-detail component
// #TODO - import heroes component
import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // #TODO - add heroes-detail routes
  // #TODO - add heroes routes
  { path: '**', redirectTo: '/dashboard' }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
