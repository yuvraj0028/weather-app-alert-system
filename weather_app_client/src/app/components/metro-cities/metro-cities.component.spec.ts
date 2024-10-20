import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroCitiesComponent } from './metro-cities.component';

describe('MetroCitiesComponent', () => {
  let component: MetroCitiesComponent;
  let fixture: ComponentFixture<MetroCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetroCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetroCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
