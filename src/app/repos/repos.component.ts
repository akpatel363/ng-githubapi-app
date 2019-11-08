import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/commons/data.service'
import { Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  query:string
  constructor(private service:DataService,private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute) {}
  searched(query:string){
    if(this.searchGroup.valid){
      this.resetProperties()
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
    this.repos = null
    this.currentResults = null
    this.totalResults = null
  }
  ngOnInit(){
    this.route.queryParamMap.subscribe((params)=>{
      if(params.get('name')!=null){
        this.query = params.get('name')
        this.currentPage = Number.parseInt(params.get('pageno'))
        this.searchRepos()
      }
    })
    this.searchGroup = this.formBuilder.group({
      repositoryName:[this.query,Validators.required]
    })
  }
  searchRepos(){
    this.service.searchRepositories(this.query,this.currentPage).subscribe((response)=>{
      this.parseResults(response)
    })
  }
  parseResults(response){
    this.totalResults = response['total_count']
    this.repos = response['items']
    this.currentResults = this.repos.length
    console.log('got data')
  }
  pageChanged(no:number){
    if(no>=1&&this.currentResults==12&&no!=this.currentPage){
      this.router.navigate(['/repository'],{
        queryParams:{
          name:this.query,
          pageno:no
        }
      })
      this.resetProperties()
    }
  }
}
