import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigFormComponent } from './create-config-form.component';

describe('CreateConfigFormComponent', () => {
  let component: CreateConfigFormComponent;
  let fixture: ComponentFixture<CreateConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
