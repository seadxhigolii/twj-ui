import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-multi-dropdown',
  templateUrl: './generic-multi-dropdown.component.html',
  styleUrls: ['./generic-multi-dropdown.component.scss']
})
export class GenericMultiDropdownComponent {
  @Input() options: any[] = [];
  @Input() placeholder: string = '--Select Options--';
  @Input() label: string = '';
  @Input() forAttribute?: string;
  @Input() optionTextProperty: string = 'name';
  @Input() optionValueProperty: string = 'value';

  @Output() selectionChange = new EventEmitter<string[]>(); 

  constructor() { }

  onSelectionChange(selectElement: HTMLSelectElement): void {
    const selectedValues = Array.from(selectElement.selectedOptions)
                                .map(option => option.value);
    this.selectionChange.emit(selectedValues);
}

}
