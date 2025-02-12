import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunFormComponent } from './test-run-form.component';

describe('TestRunFormComponent', () => {
  let component: TestRunFormComponent;
  let fixture: ComponentFixture<TestRunFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRunFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
