import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() label?: string = 'Label';
  @Input() isChecked?: boolean = false;

  constructor() {}

  clickHandler(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
