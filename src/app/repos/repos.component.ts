import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/commons/data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-repos",
  templateUrl: "./repos.component.html",
  styleUrls: ["./repos.component.css"],
})
export class ReposComponent implements OnInit {
  repos: Array<any>;
  error: string;
  query: string;
  page: number;
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
    this.route.queryParamMap.subscribe((params) => {
      this.repos = this.error = null;
      if (params.get("query") != null) {
        this.page = parseInt(params.get("page"));
        this.page = this.page < 1 ? 1 : this.page;
        this.query = params.get("query");
        this.searchRepos();
      }
    });
  }
  searchRepos() {
    const obs = this.service
      .searchRepositories(this.query, this.page)
      .subscribe(
        (response) => {
          this.repos = response["items"];
        },
        (err) => {
          this.error = err.message;
          obs.unsubscribe();
        },
        () => obs.unsubscribe()
      );
  }
}
