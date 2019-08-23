import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searched-repository',
  templateUrl: './searched-repository.component.html',
  styleUrls: ['./searched-repository.component.css']
})
export class SearchedRepositoryComponent implements OnInit {
  @Input() repo:Object
  constructor() { }

  ngOnInit() {
  }

}
