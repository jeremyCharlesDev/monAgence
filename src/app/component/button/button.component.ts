import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() color: string;
  @Input() margin: any;
  @Input() typedubouton: string;
  @Input() value: string;

  buttonClass = '';
  btnType = '';
  text = '';

  constructor() { }

  ngOnInit(): void {
    this.buttonClass = 'btn btn-' + this.color + ' ' + this.margin;
    this.btnType = this.typedubouton;
    this.text = this.value;
  }

  onClick() {
    console.log(this.btnType);
  }

}
