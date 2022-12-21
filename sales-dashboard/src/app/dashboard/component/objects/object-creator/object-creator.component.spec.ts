import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreatorComponent } from './object-creator.component';

describe('ObjectCreatorComponent', () => {
  let component: ObjectCreatorComponent;
  let fixture: ComponentFixture<ObjectCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
