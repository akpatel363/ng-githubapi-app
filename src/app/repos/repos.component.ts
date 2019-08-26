import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service'
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
      this.router.navigate(['/repository',query,1])
      console.log(this.router.url)
    }
  }
  resetProperties(){
    this.query = null
    this.repos = null
    this.currentResults = null
    this.totalResults = null
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params)=>{
      if(params.get('query')!=null){
        this.query = params.get('query')
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
    },(error=>{
      throwError(error)
    }))
  }
  parseResults(response){
    this.totalResults = response['total_count']
    this.repos = response['items']
    this.currentResults = this.repos.length
    console.log('got data')
  }
  pageChanged(no:number){
    if(no>=1&&this.currentResults==12&&no!=this.currentPage){
      this.router.navigate(['/repository',this.query,no])
      this.resetProperties()
    }
  }
}
