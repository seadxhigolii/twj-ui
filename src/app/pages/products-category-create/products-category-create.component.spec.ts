import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoryCreateComponent } from './products-category-create.component';

describe('ProductsCategoryCreateComponent', () => {
  let component: ProductsCategoryCreateComponent;
  let fixture: ComponentFixture<ProductsCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCategoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
