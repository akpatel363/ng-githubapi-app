import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedRepositoryComponent } from './searched-repository.component';

describe('SearchedRepositoryComponent', () => {
  let component: SearchedRepositoryComponent;
  let fixture: ComponentFixture<SearchedRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
