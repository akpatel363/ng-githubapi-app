import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  formGroup:FormGroup
  constructor(private formBuilder:FormBuilder,private router:Router) {
    this.formGroup = this.formBuilder.group({
      gitUsername:[null,Validators.required]
    })
    console.log(this.router.url)
  }
  ngOnInit() {}
  showData(formsValue){
    if(this.formGroup.valid){
      console.log(this.router.url)
      this.router.navigate(['/about',formsValue.gitUsername])
    }
  }
  visibleSearchBar(){
    return this.router.url.includes('\about')
  }
}
