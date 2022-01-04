import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursPanelComponent } from './hours-panel.component';

describe('HoursPanelComponent', () => {
  let component: HoursPanelComponent;
  let fixture: ComponentFixture<HoursPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
