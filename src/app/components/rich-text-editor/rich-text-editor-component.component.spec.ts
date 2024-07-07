import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextEditorComponentComponent } from './rich-text-editor-component.component';

describe('RichTextEditorComponentComponent', () => {
  let component: RichTextEditorComponentComponent;
  let fixture: ComponentFixture<RichTextEditorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichTextEditorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichTextEditorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
