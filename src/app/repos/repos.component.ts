import { Component, OnInit, Input } from '@angular/core';
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
  totalResults:number
  currentResults:number
  currentPage:number
  error=0
  status:Number
  query:string
  constructor(private service:DataService,private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute) {}
  searched(query:string){
    if(this.searchGroup.valid){
      this.router.navigate(['/repository'],{
        queryParams:{
          name:query,
          pageno:1
        }
      })
    }
  }
  resetProperties(){
    this.query = null
    this.error = 0
    this.repos = null
    this.currentResults = null
    this.totalResults = null
  }
  ngOnInit(){
    this.route.queryParamMap.subscribe((params)=>{
      this.resetProperties()
      if(params.get('name')!=null){
        this.query = params.get('name')
        Number.parseInt(params.get('pageno'))?this.currentPage = Number.parseInt(params.get('pageno')):this.currentPage=1
        this.searchRepos()
      }else{
        this.status = 0
      }
    })
    this.searchGroup = this.formBuilder.group({
      repositoryName:[this.query,Validators.required]
    })
  }
  searchRepos(){
    this.status = 1
    this.service.searchRepositories(this.query,this.currentPage).subscribe((response)=>{
      response['total_count']==0?this.error=2:this.parseResults(response)
    },(error)=>{
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
  parseResults(response){
    this.totalResults = response['total_count']
    this.repos = response['items']
    this.currentResults = this.repos.length
  }
  pageChanged(no:number){
    if(no>=1&&this.currentResults==12&&no!=this.currentPage){
      var name = this.query
      this.router.navigate(['/repository'],{
        queryParams:{
          name,
          pageno:no
        }
      })
    }
  }
}
