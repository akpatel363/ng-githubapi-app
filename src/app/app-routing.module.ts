import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from "./details/details.component";
import { ReposComponent } from './repos/repos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/users" },
  { path: "users", component: UsersComponent },
  { path: "details/:username", component: DetailsComponent },
  { path: "repository", component: ReposComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration:'top'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
