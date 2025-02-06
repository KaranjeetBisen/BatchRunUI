import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewDemoComponent } from './form-view-demo.component';

describe('FormViewDemoComponent', () => {
  let component: FormViewDemoComponent;
  let fixture: ComponentFixture<FormViewDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
