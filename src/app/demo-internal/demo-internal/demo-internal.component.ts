import { Component, OnInit } from '@angular/core';
import { AppointmentPersonModel } from 'src/lib/appointment-scheduler.model';

@Component({
  selector: 'app-demo-internal',
  templateUrl: './demo-internal.component.html',
  styleUrls: ['./demo-internal.component.scss']
})
export class DemoInternalComponent implements OnInit {
  personList: Array<AppointmentPersonModel> = [
    {id: 1, name: 'Bayu Candra'},
    {id: 2, name: 'Iis'},
    {id: 3, name: 'Rio'},
    {id: 4, name: 'Qia'},
    {id: 5, name: 'Nifa'},
    {id: 6, name: 'Ikhsan'},
    {id: 7, name: 'Hafiz'},
    {id: 8, name: 'Izar'},
    {id: 9, name: 'Izar'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
