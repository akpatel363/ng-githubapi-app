import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent{
  @Input() repo:Object
  constructor() { }
}
