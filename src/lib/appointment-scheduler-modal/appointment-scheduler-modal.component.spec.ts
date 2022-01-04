import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSchedulerModalComponent } from './appointment-scheduler-modal.component';

describe('AppointmentSchedulerModalComponent', () => {
  let component: AppointmentSchedulerModalComponent;
  let fixture: ComponentFixture<AppointmentSchedulerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentSchedulerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSchedulerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
