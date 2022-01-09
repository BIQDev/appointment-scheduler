import { Component, ElementRef, OnInit, ViewChild, Input, OnDestroy, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import * as moment_ from 'moment';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filter, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import { AppointmentSchedulerService } from '../appointment-scheduler.service';
import { AppointmentPersonModel, AppointmentPersonTimeModel } from '../appointment-scheduler.model';
import { AppointmentSchedulerModalComponent } from '../appointment-scheduler-modal/appointment-scheduler-modal.component';
import { biqHelper } from '@biqdev/ng-helper';
import { Subject } from 'rxjs';

const moment = moment_;

@Component({
  selector: 'biq-person-appointment',
  templateUrl: './person-appointment.component.html',
  styleUrls: ['./person-appointment.component.scss']
})
export class PersonAppointmentComponent implements OnInit, OnDestroy, AfterViewInit {
  stop$ = new Subject();
  @Input() personRecord: AppointmentPersonModel;

  @ViewChild('biqPersonAppointmentEl', { static: true })
  public biqPersonAppointmentEl: ElementRef;

  @ViewChildren("appointmentEls")
  appointmentEls: QueryList<ElementRef>;

  bsModalRef: BsModalRef;

  faUser = faUser;

  isAfterViewInit: boolean;

  constructor(
    public service: AppointmentSchedulerService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
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
      onPress: function (e) {
        handle.classList.add('is-active');
        e.stopPropagation();
      },
      onDrag: function () {
        gsap.set(colEl, { width: this.x + 0 });
      },
      onRelease: function () {
        handle.classList.remove('is-active');

        let colRect = colEl.getBoundingClientRect();
        gsap.set(handle, { x: colRect.width, y: 0 });
      }
    });

    this.service.appointmentPersonTimesChange$
      .pipe(
        takeUntil(this.stop$),
        filter( e => {
          let time: AppointmentPersonTimeModel = e as AppointmentPersonTimeModel;
          return time.personId === this.personRecord.id;
        } )
      )
      .subscribe( res => {
        let time: AppointmentPersonTimeModel = res as AppointmentPersonTimeModel;
        this.cdr.detectChanges()
        this.appointmentsChanges();
      } );
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  getAppointments() : Array<AppointmentPersonTimeModel> {
    return this.service.appointmentPersonTimes
      .filter(e => e.personId === this.personRecord.id);
  }

  hourMarkerShow(e, hour: string) {
    const hourMarkerEl = this.biqPersonAppointmentEl.nativeElement.querySelector('#hour-marker');
    let date = moment(hour, 'LT', true);
    if (e.target.classList.contains('hour-item__15minutes')) {
      date.add(15, 'minutes');
    }
    const hourMarkerStyle = window.getComputedStyle(hourMarkerEl);
    if (hourMarkerStyle.getPropertyValue('display') === 'none') {
      hourMarkerEl.style.top = `${e.target.offsetTop - 80}px`;
    }
    e.target.dataset.biqIsHovered = 'true';

    let timeout = 200;
    if (hourMarkerStyle.getPropertyValue('display') !== 'none') {
      timeout = 0;
    }
    setTimeout(() => {
      const isHovered = e.target.dataset.biqIsHovered === 'true';
      if (isHovered) {
        gsap.to(hourMarkerEl, { duration: 0.2, top: `${e.target.offsetTop}px`, text: date.format('LT') });
        gsap.to(hourMarkerEl, { duration: 0.4, autoAlpha: 1, display: 'flex' });
      }
    }, timeout);
  }

  hourItemMouseLeave(e) {
    e.target.dataset.biqIsHovered = 'false';
  }

  hourMarkerHide() {
    const hourMarkerEl = this.biqPersonAppointmentEl.nativeElement.querySelector('#hour-marker');
    gsap.to(hourMarkerEl, { duration: 0.5, autoAlpha: 0, display: 'none' });
  }

  onHourClick(e, appointmentHour) {
    const hourMarkerEl = this.biqPersonAppointmentEl.nativeElement.querySelector('#hour-marker');
    let date = moment(appointmentHour, 'LT', true);
    if (e.target.classList.contains('hour-item__15minutes')) {
      date.add(15, 'minutes');
    }

    const initialState = {
      list: Object.assign(
        {},
        this.service.getModalConfig(),
        {
          appointmentDate: this.service.getAppointmentDate(),
          appointmentHour: date.format('LT'),
          appointmentPerson: this.personRecord
        }
      )
    }
    this.bsModalRef = this.modalService.show(AppointmentSchedulerModalComponent, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  appointmentsChanges( filter: AppointmentPersonTimeModel = null ) {
    this.appointmentEls.filter( e => {
      if ( biqHelper.isNull(filter) ) {
        return true;
      }

      const elData: AppointmentPersonTimeModel = biqHelper.JSON.parse(e.nativeElement.getAttribute('data-appointment')) as AppointmentPersonTimeModel;
      return _.isEqual(elData, filter);
    } )
      .forEach(e => {
        let el = e.nativeElement;
        const tableConfig = this.service.getTableConfig();
        let data = el.getAttribute('data-appointment');
        let record: AppointmentPersonTimeModel = biqHelper.JSON.parse(data, true) as AppointmentPersonTimeModel;
        let top: number = ( (record.hourStart+(record.minutesStart/60)) - 8) * tableConfig.rowHeight * 4;
        let initialTop: number = top - 50;
        el.style.top = `${initialTop}px`;

        const durationMins: number = ((record.hourEnd * 60) + record.minutesEnd) - ((record.hourStart * 60) - record.minutesStart);

        let height: number = durationMins / 15 * tableConfig.rowHeight;


        const delay: number = this.isAfterViewInit ? 0 : 0.8;
        gsap.to(el, { duration: 0.3, delay, autoAlpha: 1, display: 'block', top, height });
      });
  }

  appointmentHourItemRender( rec: AppointmentPersonTimeModel ):string {
    let timeStart = `${rec.hourStart}:${rec.minutesStart}`;
    let timeEnd = `${rec.hourEnd}:${rec.minutesEnd}`;
    return moment(timeStart, 'kk:mm').format('LT') + ' to ' + moment(timeEnd, 'kk:mm').format('LT');
  }

  ngAfterViewInit() {
    this.isAfterViewInit = true;
    this.appointmentsChanges();
  }

}
