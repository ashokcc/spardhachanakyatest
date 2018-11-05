import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'keypad-component',
  templateUrl: 'keypad.component.html',
  styleUrls: ['keypad.component.scss'],
})
export class KeyPadComponent implements OnInit{
  public inputVal :any = '';
  public isCharacters: boolean = true;
  @Input() showKeyBoard;
  @Input() currFocusEl;
  @Output() evtSource = new EventEmitter();
  public changeInput = this.evtSource.asObservable();
  constructor(){}
  
  ngOnInit(){
    this.inputVal = this.currFocusEl && this.currFocusEl.hasOwnProperty('value') ? this.currFocusEl.value : this.currFocusEl ? this.currFocusEl : '';
  }

  showKeyPad(e){
    let val = e.target.attributes['data-html-code'].value;
    this.inputVal += val || '';
    //this.evtSource.emit(this.inputVal);
  }
  submitText(){
	this.evtSource.emit(this.inputVal);
  }
  toggleNumberTxt(){
    this.isCharacters = !this.isCharacters;
  }
  backSpace(){
    this.inputVal = this.inputVal.substring(0, this.inputVal.length - 1);
  }

}