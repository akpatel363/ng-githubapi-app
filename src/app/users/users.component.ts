import { Component, OnInit } from "@angular/core";
import { DataService } from "../commons/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  query: string;
  page: number;
  users: Array<Object>;
  error: string;
  constructor(
    private service: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.error = this.users = null;
      if (params.get("q")) {
        this.page = parseInt(params.get("page"));
        this.page = this.page < 1 ? 1 : this.page;
        this.query = params.get("q");
        this.searchUsers();
      }
    });
  }
  submit(f) {
    if (f.valid) {
      this.router.navigate(["/users"], {
        queryParams: { q: f.value.query, page: 1 },
      });
    }
  }
  searchUsers() {
    const obs = this.service.searchUsers(this.query, this.page).subscribe(
      (response) => {
        this.users = response["items"];
      },
      (error) => {
        this.error = error.message;
        obs.unsubscribe();
      },
      () => {
        obs.unsubscribe();
      }
    );
  }
}
