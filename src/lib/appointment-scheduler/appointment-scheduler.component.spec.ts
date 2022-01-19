import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { HoursPanelComponent } from '../hours-panel/hours-panel.component';
import { PersonAppointmentComponent } from '../person-appointment/person-appointment.component';

import { AppointmentSchedulerComponent } from './appointment-scheduler.component';

describe('AppointmentSchedulerComponent', () => {
  let component: AppointmentSchedulerComponent;
  let fixture: ComponentFixture<AppointmentSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ AppointmentSchedulerComponent, HoursPanelComponent, PersonAppointmentComponent ],
      providers: [AppointmentSchedulerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
