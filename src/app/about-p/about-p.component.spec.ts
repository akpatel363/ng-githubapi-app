import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPComponent } from './about-p.component';

describe('AboutPComponent', () => {
  let component: AboutPComponent;
  let fixture: ComponentFixture<AboutPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
