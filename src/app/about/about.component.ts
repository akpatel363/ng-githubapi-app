import { Component, OnInit } from '@angular/core';
import { DataService } from '../commons/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userData:any
  username:string
  repos=  []
  constructor(private service:DataService,private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParamMap.subscribe((response)=>{
        this.userData = null
        if(response['params'].search!=null){
          this.username = response['params'].search 
        }else{
          this.username = 'akpatel363'
        }
        this.getData()
    })
  }
  getData(){
    this.service.getUser(this.username).subscribe((response)=>{
      this.userData = response
      this.getRepositories()
    })
  }
  getRepositories(){
    this.service.getRepos(this.username).subscribe((response)=>{
      console.log(response)
      this.repos = response
    })
  }
  ngOnInit() {}
}
