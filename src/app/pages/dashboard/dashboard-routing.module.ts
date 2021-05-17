import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../info-page/info-page.module').then(m => m.InfoPageModule)
      },
      {
        path: 'detail/:networkid',
        loadChildren: () => import('../detail-page/detail-page.module').then(m => m.DetailPageModule)
      },
      {
        path: 'members',
        loadChildren: () => import('../members-page/members-page.module').then(m => m.MembersPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
