import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { RepositoryComponent } from './repository/repository.component';
import { ReposComponent } from './repos/repos.component';
import { DescriptionPipe } from './commons/description.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DetailsComponent,
    RepositoryComponent,
    ReposComponent,
    DescriptionPipe,
    PageNotFoundComponent,
    UsersComponent,
    UserComponent,
    SpinnerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }