import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectModalComponent } from './object-modal.component';

describe('ObjectModalComponent', () => {
  let component: ObjectModalComponent;
  let fixture: ComponentFixture<ObjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
