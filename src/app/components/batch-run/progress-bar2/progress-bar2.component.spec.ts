import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBar2Component } from './progress-bar2.component';

describe('ProgressBar2Component', () => {
  let component: ProgressBar2Component;
  let fixture: ComponentFixture<ProgressBar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
