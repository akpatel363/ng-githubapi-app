import { Component, Input } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent {
  @Input() page: number;
  @Input() query: any = {};
  @Input() link: string;
  constructor() {}
  getQueryParams = (n: number) => ({ page: this.page + n, ...this.query });
}
