import { Component, OnInit } from '@angular/core';
import { DataService } from '../commons/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoConnectionError } from '../commons/no-connection.error';
import { NothingFoundError } from '../commons/nothing-found.error';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userData: any
  username: string
  repos = []
  error:Number
  status:Number
  constructor(private service: DataService, private activeRoute: ActivatedRoute, private router:Router) { }
  getData() {
    this.service.getUser(this.username).subscribe((response) => {
      this.userData = response
      this.getRepositories()
    },(e)=>{
      if(e instanceof NoConnectionError){
        this.error = 1
      }else if(e instanceof NothingFoundError){
        this.error = 2
      }else{
        this.error = 3
      }
      this.status = 2
    })
  }
  getRepositories() {
    this.service.getRepos(this.username).subscribe((response) => {
      this.repos = response
    })
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(response=>{
      this.userData = null
      this.repos = null
      if (response['params'].username != null) {
        this.username = response['params'].username
        this.status = 1
        this.getData()
      }else{
        this.status = 0 
      }
    })
  }
}
