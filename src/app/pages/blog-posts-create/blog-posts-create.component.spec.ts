import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsCreateComponent } from './blog-posts-create.component';

describe('BlogPostsCreateComponent', () => {
  let component: BlogPostsCreateComponent;
  let fixture: ComponentFixture<BlogPostsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
