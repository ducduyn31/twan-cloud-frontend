import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        // loadChildren: () => import('../info-page/info-page.module').then(m => m.InfoPageModule)
        loadChildren: () => import('../detail-page/detail-page.module').then(m => m.DetailPageModule)
      },
      {
        path: '/detail',
        loadChildren: () => import('../detail-page/detail-page.module').then(m => m.DetailPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
