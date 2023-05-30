import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  
  transform(list: any, filterText?: any): any {
    if(!list || !filterText){
      return list;
    }
    
    return list.filter( (i:any) => {
      //Devices
      if(i.name && i.name.toString().toLowerCase().includes(filterText.toLowerCase())){
        return i.name.toString().toLowerCase().includes(filterText.toLowerCase());
      };
      if(i.site && i.site.toString().toLowerCase().includes(filterText.toLowerCase())){
        return i.site.toString().toLowerCase().includes(filterText.toLowerCase());
      };
      if(i.location && i.location.toString().toLowerCase().includes(filterText.toLowerCase())){
        return i.location.toString().toLowerCase().includes(filterText.toLowerCase());
      };
      if(i.email && i.email.toString().toLowerCase().includes(filterText.toLowerCase())){
        return i.email.toString().toLowerCase().includes(filterText.toLowerCase());
      };
    });
  }
}
