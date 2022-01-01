import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { AppointmentPersonModel } from '../appointment-scheduler.model';

import {faUser} from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(Draggable);

@Component({
  selector: 'biq-person-appointment',
  templateUrl: './person-appointment.component.html',
  styleUrls: ['./person-appointment.component.scss']
})
export class PersonAppointmentComponent implements OnInit {
  @Input() personRecord: AppointmentPersonModel;

  @ViewChild('biqPersonAppointment', { static: true })
  public biqPersonAppointment: ElementRef;

  faUser = faUser;

  constructor(
    public service: AppointmentSchedulerService
  ) {
  }

  ngOnInit() {
    let colEl = this.biqPersonAppointment.nativeElement;
    let handle = this.biqPersonAppointment.nativeElement.querySelector('.col-resize-handle');

    let colRect = colEl.getBoundingClientRect();
    gsap.set(handle, { x: colRect.width, y: 0 });

    Draggable.create(handle, {
      autoScroll: 1,
      cursor: 'e-resize',
      type: 'x',
      onPress: function(e) {
        handle.classList.add('is-active');
        e.stopPropagation();
      },
      onDrag: function() {
        console.log(this.x);
        gsap.set(colEl, { width: this.x + 0 });
      },
      onRelease: function() {
        handle.classList.remove('is-active');
        
        let colRect = colEl.getBoundingClientRect();
        gsap.set(handle, { x: colRect.width, y: 0 });
      }
    });
  }

}
