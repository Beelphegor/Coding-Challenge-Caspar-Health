import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistListComponent } from './therapist-list.component';

describe('TherapistListComponent', () => {
  let component: TherapistListComponent;
  let fixture: ComponentFixture<TherapistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});