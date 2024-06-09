import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPostsComponent } from './author-posts.component';

describe('AuthorPostsComponent', () => {
  let component: AuthorPostsComponent;
  let fixture: ComponentFixture<AuthorPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
