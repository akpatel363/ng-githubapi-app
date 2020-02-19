import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { RepositoryComponent } from './repository/repository.component';
import { ReposComponent } from './repos/repos.component';
import { AppErrorHandler } from './commons/app-error.handler';
import { DescriptionPipe } from './commons/description.pipe';
import { SearchedRepositoryComponent } from './searched-repository/searched-repository.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { AboutPComponent } from './about-p/about-p.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    RepositoryComponent,
    ReposComponent,
    DescriptionPipe,
    SearchedRepositoryComponent,
    PageNotFoundComponent,
    FooterComponent,
    UsersComponent,
    AboutPComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide:ErrorHandler,useClass:AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }