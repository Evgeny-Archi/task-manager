import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Input() className: string = '';
  @Input() disabled: boolean = false;

  constructor() {}

  clickHandler(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
