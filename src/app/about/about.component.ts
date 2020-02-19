import { Component, OnInit } from '@angular/core';
import { DataService } from '../commons/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userData: any
  repos = []
  error:string
  status:Number
  constructor(private service: DataService, private activeRoute: ActivatedRoute, private router:Router) { }
  getData(username) {
    const obs = this.service.getUser(username).subscribe((response) => {
      this.userData = response
      this.getRepositories(username)
    },(e)=>{
      this.error = e.message
      obs.unsubscribe()
    },()=>obs.unsubscribe())
  }
  getRepositories(username) {
    const obs = this.service.getRepos(username).subscribe((response) => {
      this.repos = response as Array<any>
    },(err)=>{
      this.error = err.message
      obs.unsubscribe()
    },()=>obs.unsubscribe())
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(response=>{
      this.error = this.userData = this.repos = null
      this.status = 1
      this.getData(response.get('username'))
    })
  }
}
