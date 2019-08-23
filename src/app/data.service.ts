import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { NoConnectionError } from './commons/no-connection.error';
import { NothingFoundError } from './commons/nothing-found.error';
import { AppError } from './commons/app.error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) {
    
  }
  getRepos(username:string){
    return this.http.get(`https://api.github.com/users/${username}/repos`).pipe(map((response:any[])=>{
      return response
    },catchError(this.handleError)))
  }
  getCommits(repo:Object){
    return this.http.get(`https://api.github.com/repos/${repo['full_name']}/commits`).pipe(map((response:any)=>{
      return Object.keys(response).length
    },catchError(this.handleError)))
  }
  getUser(username:string){
    return this.http.get(`https://api.github.com/users/${username}`).pipe(map((response:any)=>{
      return response
    }),catchError(this.handleError))
  }
  getContributors(projectName:string){
    return this.http.get(`https://api.github.com/repos/${projectName}/contributors`).pipe(map(response=>{
      return response
    }),catchError(this.handleError))
  }
  handleError(error){
    if(error.status==0){
      return throwError(new NoConnectionError(error))
    }else if(error.status==404||error.status==409){
      return throwError(new NothingFoundError(error))
    }
    return throwError(new AppError(error))
  }
  searchRepositories(query:string,page:number){
    return this.http.get(`http://api.github.com/search/repositories?q=${query}&page=${page}&per_page=12`).pipe(map(response=>{
      console.log(response)
      return response
    }),catchError(this.handleError))
  }
}
