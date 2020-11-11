import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "src/app/commons/data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Repository } from "../commons/models/Repository";
import { Subscription } from "rxjs";

@Component({
  selector: "app-repos",
  templateUrl: "./repos.component.html",
  styleUrls: ["./repos.component.css"],
})
export class ReposComponent implements OnInit, OnDestroy {
  repos: Array<Repository>;
  error: string;
  query: string;
  page: number;
  sub = new Subscription();
  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  submit(f) {
    if (f.valid) {
      this.router.navigate(["/repository"], {
        queryParams: { query: f.value.query, page: 1 },
      });
    }
  }
  ngOnInit() {
    this.sub.add(
      this.route.queryParamMap.subscribe((params) => {
        this.repos = this.error = null;
        if (params.get("query") != null) {
          this.page = parseInt(params.get("page"));
          this.page = this.page < 1 ? 1 : this.page;
          this.query = params.get("query");
          this.searchRepos();
        }
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  searchRepos() {
    this.service.searchRepositories(this.query, this.page).subscribe(
      (response) => {
        this.repos = response["items"];
      },
      (err) => {
        this.error = err.message;
      }
    );
  }
}
