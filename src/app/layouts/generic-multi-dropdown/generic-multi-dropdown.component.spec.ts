import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMultiDropdownComponent } from './generic-multi-dropdown.component';

describe('GenericMultiDropdownComponent', () => {
  let component: GenericMultiDropdownComponent;
  let fixture: ComponentFixture<GenericMultiDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericMultiDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericMultiDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
