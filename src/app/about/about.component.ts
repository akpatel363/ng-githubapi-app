import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
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
    this.activeRoute.params.subscribe((response)=>{
      this.userData = null
      if(response['username']!=null){
        this.username = response['username']
      }else{
        this.username = 'akpatel363'
      }
      this.getData()
      this.getRepositories()
    }) 
  }
  getData(){
    this.service.getUser(this.username).subscribe((response)=>{
      this.userData = response
    })
  }
  getRepositories(){
    this.service.getRepos(this.username).subscribe((response)=>{
      console.log(response)
      this.repos = response
    },(error)=>{
      alert(error['message'])
      console.log(typeof error)
    })
  }
  ngOnInit() {}
}
