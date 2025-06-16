import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourZoneComponent } from './hour-zone.component';

describe('HourZoneComponent', () => {
  let component: HourZoneComponent;
  let fixture: ComponentFixture<HourZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
