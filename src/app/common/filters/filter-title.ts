import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name:'filterTitle'
})
export class FilterTitle implements PipeTransform{
    transform(list: any[], value: any, ) {
        if(!value || value === ''){
            return list;
        }
        return list.filter((item)=> item.topic.includes(value));
    }
    constructor(){}
}