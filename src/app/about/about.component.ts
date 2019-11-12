import { Component, OnInit } from '@angular/core';
import { DataService } from '../commons/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  searchForm: FormGroup
  constructor(private service: DataService, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder, private router:Router) { }
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
      console.log(this.error)
    })
  }
  getRepositories() {
    this.service.getRepos(this.username).subscribe((response) => {
      this.repos = response
    })
  }
  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((response) => {
      this.userData = null
      this.repos = null
      if (response['params'].search != null) {
        this.username = response['params'].search
      } else {
        this.username = 'akpatel363'
      }
      this.getData()
    })
    this.searchForm = this.formBuilder.group({
      'username':[this.username,Validators.required]
    })
  }
  submit(){
    if(this.searchForm.valid){
      this.router.navigate(['/user'],{queryParams:{
        search:this.searchForm.value.username
      }})
    }
  }
}
