import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../commons/data.service";
import { ActivatedRoute } from "@angular/router";
import { Repository } from "../commons/models/Repository";
import { User } from "../commons/models/User";
import { Subscription } from "rxjs";

@Component({
  selector: "app-about",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: User;
  repos: Array<Repository>;
  error: string;
  status: number;
  sub = new Subscription();
  constructor(
    private service: DataService,
    private activeRoute: ActivatedRoute
  ) {}
  getData(username) {
    this.service.getUser(username).subscribe(
      (response) => {
        this.user = response as User;
        this.getRepositories(username);
      },
      (e) => {
        this.error = e.message;
      }
    );
  }
  getRepositories(username) {
    this.service.getRepos(username).subscribe(
      (response) => (this.repos = response as Array<Repository>),
      (err) => {
        this.error = err.message;
      }
    );
  }
  ngOnInit() {
    this.sub.add(
      this.activeRoute.paramMap.subscribe((response) => {
        this.error = this.user = this.repos = null;
        this.status = 1;
        this.getData(response.get("username"));
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
