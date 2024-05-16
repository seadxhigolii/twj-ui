import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html',
  styleUrls: ['./generic-dropdown.component.scss']
})
export class GenericDropdownComponent {
  @Input() options: any[] = []; 
  @Input() placeholder: string = '--Select an Option--';
  @Input() label: string = '';
  @Input() forAttribute?: string;  
  @Input() optionTextProperty: string = 'name'; 
  @Input() optionValueProperty: string = 'value'; 
  @Input() createButton: boolean = false;  // New property to show the create button
  @Input() createButtonFunction: () => void;

  @Output() selectionChange = new EventEmitter<string>();

  constructor() { }

  onSelectionChange(selectedValue: string): void {
    this.selectionChange.emit(selectedValue);
  }

}
