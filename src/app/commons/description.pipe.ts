import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "description",
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string): string {
    if (value == null) {
      return "No Description.";
    } else if (value.length > 120) {
      return value.substr(0, 120).concat("...");
    } else {
      return value;
    }
  }
}
