import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../commons/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../commons/models/User";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit, OnDestroy {
  query: string;
  page: number;
  users: Array<User>;
  error: string;
  sub = new Subscription();
  constructor(
    private service: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.sub.add(
      this.activatedRoute.queryParamMap.subscribe((params) => {
        this.error = this.users = null;
        if (params.get("query")) {
          this.page = parseInt(params.get("page"));
          this.page = this.page < 1 ? 1 : this.page;
          this.query = params.get("query");
          this.searchUsers();
        }
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  submit(f) {
    if (f.valid) {
      this.router.navigate(["/users"], {
        queryParams: { query: this.query, page: 1 },
      });
    }
  }
  searchUsers() {
    this.service.searchUsers(this.query, this.page).subscribe(
      (response) => {
        this.users = response["items"];
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
