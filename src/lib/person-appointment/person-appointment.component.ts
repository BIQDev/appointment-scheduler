import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { TextPlugin } from "gsap/TextPlugin";
import { AppointmentPersonModel } from '../appointment-scheduler.model';
import * as moment from 'moment';

import {faUser} from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(Draggable, TextPlugin);

@Component({
  selector: 'biq-person-appointment',
  templateUrl: './person-appointment.component.html',
  styleUrls: ['./person-appointment.component.scss']
})
export class PersonAppointmentComponent implements OnInit {
  @Input() personRecord: AppointmentPersonModel;

  @ViewChild('biqPersonAppointmentEl', { static: true })
  public biqPersonAppointmentEl: ElementRef;

  faUser = faUser;

  constructor(
    public service: AppointmentSchedulerService
  ) {
  }

  ngOnInit() {
    let colEl = this.biqPersonAppointmentEl.nativeElement;
    let handle = this.biqPersonAppointmentEl.nativeElement.querySelector('.col-resize-handle');

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
        gsap.set(colEl, { width: this.x + 0 });
      },
      onRelease: function() {
        handle.classList.remove('is-active');
        
        let colRect = colEl.getBoundingClientRect();
        gsap.set(handle, { x: colRect.width, y: 0 });
      }
    });
  }

  hourMarkerShow(e, hour: string) {
    const hourMarkerEl = this.biqPersonAppointmentEl.nativeElement.querySelector('#hour-marker');
    let date = moment(hour, 'LT', true);
    if ( e.target.classList.contains('hour-item__15minutes') ) {
      date.add(15, 'minutes');
    }
    const hourMarkerStyle = window.getComputedStyle(hourMarkerEl);
    if ( hourMarkerStyle.getPropertyValue('display') === 'none' ) {
      hourMarkerEl.style.top = `${e.target.offsetTop - 80}px`;
    }
    e.target.dataset.biqIsHovered = 'true';
    setTimeout( () => {
      const isHovered = e.target.dataset.biqIsHovered === 'true';
      if ( isHovered ) {
        gsap.to(hourMarkerEl, { duration: 0.2, top: `${e.target.offsetTop}px`, text: date.format('LT')});
        gsap.to(hourMarkerEl, { duration: 0.4, autoAlpha: 1, display: 'flex'});
      }
    }, 200);
  }

  hourItemMouseLeave(e) {
    e.target.dataset.biqIsHovered = 'false';
  }

  hourMarkerHide(e) {
    const hourMarkerEl = this.biqPersonAppointmentEl.nativeElement.querySelector('#hour-marker');
    gsap.to(hourMarkerEl, { duration: 0.5, autoAlpha: 0, display: 'none'});
  }

}
