import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigForm2Component } from './create-config-form-2.component';

describe('CreateConfigForm2Component', () => {
  let component: CreateConfigForm2Component;
  let fixture: ComponentFixture<CreateConfigForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConfigForm2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConfigForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
