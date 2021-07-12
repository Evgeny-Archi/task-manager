import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: string = '';
  @Input() label?: string = 'Label';
  @Input() isChecked?: boolean = false;

  constructor() {}

  clickHandler(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
