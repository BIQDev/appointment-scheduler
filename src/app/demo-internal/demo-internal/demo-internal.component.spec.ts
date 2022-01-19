import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HoursPanelComponent } from 'dist/hours-panel/hours-panel.component';
import { AppointmentSchedulerModule } from 'src/lib/appointment-scheduler.module';
import { AppointmentSchedulerService } from 'src/lib/appointment-scheduler.service';
import { AppointmentSchedulerComponent } from 'src/lib/appointment-scheduler/appointment-scheduler.component';

import { DemoInternalComponent } from './demo-internal.component';

describe('DemoInternalComponent', () => {
  let component: DemoInternalComponent;
  let fixture: ComponentFixture<DemoInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoInternalComponent ],
      imports: [FormsModule, FontAwesomeModule, AppointmentSchedulerModule],
      providers: [ AppointmentSchedulerService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component,"=================");
    expect(component).toBeTruthy();
  });
});
