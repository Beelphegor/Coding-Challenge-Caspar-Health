import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicNewComponent } from './clinic-new.component';

describe('ClinicNewComponent', () => {
  let component: ClinicNewComponent;
  let fixture: ComponentFixture<ClinicNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
