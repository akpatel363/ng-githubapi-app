import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { NoConnectionError } from "./errors/no-connection.error";
import { NothingFoundError } from "./errors/nothing-found.error";
import { AppError } from "./errors/app.error";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  private handleError(error) {
    if (error.status == 0) {
      return throwError(new NoConnectionError());
    } else if (error.status == 404 || error.status == 409) {
      return throwError(new NothingFoundError());
    }
    return throwError(new AppError());
  }

  getRepos = (username: string) =>
    this.http
      .get(`https://api.github.com/users/${username}/repos`)
      .pipe(catchError(this.handleError));
  getUser = (username: string) =>
    this.http
      .get(`https://api.github.com/users/${username}`)
      .pipe(catchError(this.handleError));
  searchUsers = (query: string, page = 1) =>
    this.http
      .get(
        `https://api.github.com/search/users?per_page=12&q=${query}&page=${page}`
      )
      .pipe(catchError(this.handleError));
  searchRepositories = (query: string, page: number = 1) =>
    this.http
      .get(
        `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=12`
      )
      .pipe(catchError(this.handleError));
}
