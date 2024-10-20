import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerAlertComponent } from './trigger-alert.component';

describe('TriggerAlertComponent', () => {
  let component: TriggerAlertComponent;
  let fixture: ComponentFixture<TriggerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
