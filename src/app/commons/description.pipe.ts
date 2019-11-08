import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value:string, ...args: any[]): any {
      if(value.length>120){
        return value.substr(0,120).concat('...')
      }else{
        return value
      }
  }

}
