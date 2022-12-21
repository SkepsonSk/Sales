import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMenuComponent } from './object-menu.component';

describe('ObjectMenuComponent', () => {
  let component: ObjectMenuComponent;
  let fixture: ComponentFixture<ObjectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
