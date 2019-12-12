import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/commons/data.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoConnectionError } from '../commons/no-connection.error';
import { NothingFoundError } from '../commons/nothing-found.error';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit{
  searchGroup:FormGroup
  repos = []
  status:Number
  error=0
  currData = {}
  constructor(private service:DataService,private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute) {}
  searched(query:string){
    if(this.searchGroup.valid){
      this.router.navigate(['/repository'],{
        queryParams:{query, page:1}
      })
    }
  }
  ngOnInit(){
    this.route.queryParamMap.subscribe((params)=>{
      this.repos = null
      if(params.get('query')!=null){
        this.currData = {
          'query':params.get('query'),
          'page':params.get('page')&&!isNaN(Number.parseInt(params.get('page')))?Number.parseInt(params.get('page')):1,
        }
        this.status = 1
        this.searchRepos()
      }
    })
    this.searchGroup = this.formBuilder.group({
      repositoryName:[this.currData['query'],Validators.required]
    })
  }
  searchRepos(){
    this.service.searchRepositories(this.currData['query'],this.currData['page']).subscribe((response)=>{
      this.repos = response['items']
    },(error)=>{
      this.status = 3
      if(error instanceof NoConnectionError){
        this.error = 1
      }else if(error instanceof NothingFoundError){
        this.error = 2
      }else{
        this.error = 3
      }
      this.status = 2
    })
  }
}
