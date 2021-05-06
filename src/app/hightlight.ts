import { Calculator } from './calculator';
import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[highlight]',
})

export class Highlight implements OnInit {

  private element: HTMLElement;
  private calculator: Calculator;


  // tslint:disable-next-line: no-input-rename
  @HostBinding('style.backgroundColor')
  @Input('bg-color')
  bgColor = 'yellow';

  @HostBinding('style.color')
  fontColor = '#333';

  constructor(element: ElementRef, calculator: Calculator) {
    this.element = element.nativeElement;
    this.calculator = calculator;
}

@HostListener('click')
onClick() {
  this.bgColor = 'lightgreen';
  console.log('Je calcule la TVA : ', this.calculator.calculate(100));
}

  ngOnInit(): void {
    // this.element.style.backgroundColor = 'yellow';
    // this.element.style.color = '#333';

    // this.element.addEventListener('click', () => {
    //   // this.element.style.backgroundColor = 'lightgreen';
    //   this.bgColor = 'lightgreen';
    //   console.log('Je calcule la TVA : ', this.calculator.calculate(100));
    // });
    // this.element.addEventListener('click', this.onClick.bind(this));
  }
}
