import { Component, Input } from "@angular/core";
import { Repository } from "../commons/models/Repository";

@Component({
  selector: "repository",
  templateUrl: "./repository.component.html",
  styleUrls: ["./repository.component.css"],
})
export class RepositoryComponent {
  @Input() repo: Repository;
  constructor() {}
}
