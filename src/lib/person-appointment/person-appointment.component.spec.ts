import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { BiqJsonSerializePipe } from '../pipes/json-serialize.pipe';

import { PersonAppointmentComponent } from './person-appointment.component';

describe('PersonAppointmentComponent', () => {
  let component: PersonAppointmentComponent;
  let fixture: ComponentFixture<PersonAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ PersonAppointmentComponent, BiqJsonSerializePipe ],
      providers: [AppointmentSchedulerService, BsModalService, ComponentLoaderFactory, PositioningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
