import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name:'filterEmail'
})
export class FilterEmail implements PipeTransform{
    transform(list: any[], value: any, ) {
		let val = (value && value !== '') ? value.toLowerCase() : '';
        if(!val || val === ''){
            return list;
        }
        return list.filter((item)=> item.email.includes(val));
    }
    constructor(){}
}