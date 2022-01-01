import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInternalComponent } from './demo-internal.component';

describe('DemoInternalComponent', () => {
  let component: DemoInternalComponent;
  let fixture: ComponentFixture<DemoInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
