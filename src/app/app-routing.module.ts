import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReposComponent } from './repos/repos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/user'},
  {path:'user',component:AboutComponent},
  {path:'repository',component:ReposComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration:'top'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
