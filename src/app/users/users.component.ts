import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../commons/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstantiateExpr } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchForm:FormGroup
  users:Array<Object>
  status:number
  currData = {}
  constructor(private formBuilder:FormBuilder,private service:DataService,private activatedRoute:ActivatedRoute,private router:Router) {}
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params=>{
      if(params.get('q')){
        this.users = null
        this.currData = {
          'q':params.get('q'),
          'page':params.get('page')&&!isNaN(Number.parseInt(params.get('page')))?Number.parseInt(params.get('page')):1,
        }
        this.status = 1
        this.searchUsers()
      }
    })
    this.searchForm = this.formBuilder.group({
      'query':[this.currData['q'],Validators.required]
    })
  }
  submitForm(){
    if(this.searchForm.valid){
      this.router.navigate(['/users'],{
        queryParams:{
          'q':this.searchForm.value['query'],
          'page':1
        }
      })
    }
  }
  searchUsers(){
    this.service.searchUsers(this.currData['q'],this.currData['page']).subscribe(response=>{
      this.status = 2
      this.users = response['items']
    },error=>{
      this.status = 3
    })
  }
}
