import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAppointmentComponent } from './person-appointment.component';

describe('PersonAppointmentComponent', () => {
  let component: PersonAppointmentComponent;
  let fixture: ComponentFixture<PersonAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAppointmentComponent ]
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
