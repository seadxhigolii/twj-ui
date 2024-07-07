import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor-component.component.html',
  styleUrls: ['./rich-text-editor-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor {
  public editorContent: string = '';
  onChange: Function;
  onTouched: Function;

  writeValue(value: any): void {
    this.editorContent = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges(): void {
    this.onChange(this.editorContent);
  }

  ngAfterViewInit() {
    this.updateContent();  // Update the content after view initialization
  }

  format(command: string, value?: string) {
    document.execCommand(command, false, value);
    this.updateContent();  // Update content after format change
  }

  onContentChange(event: Event) {
    const target = event.target as HTMLElement;
    this.editorContent = target.innerHTML;
  }

  updateContent() {
    const editor = document.querySelector('.text-editor') as HTMLElement;
    if (editor) {
      editor.innerHTML = this.editorContent;  // Force the innerHTML update
    }
  }
  
}
