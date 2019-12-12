import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReposComponent } from './repos/repos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { AboutPComponent } from './about-p/about-p.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/users'},
  {path:'users',component:UsersComponent},
  {path:'about/:username',component:AboutComponent},
  {path:'repository',component:ReposComponent},
  {path:'about-app',component:AboutPComponent},
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
