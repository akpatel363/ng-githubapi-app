import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReposComponent } from './repos/repos.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/about'},
  {path:'about/:username',component:AboutComponent},
  {path:'about',component:AboutComponent},
  {path:'repository',component:ReposComponent},
  {path:'repository/:query',component:ReposComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
