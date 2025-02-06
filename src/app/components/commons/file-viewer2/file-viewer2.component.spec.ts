import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewer2Component } from './file-viewer2.component';

describe('FileViewer2Component', () => {
  let component: FileViewer2Component;
  let fixture: ComponentFixture<FileViewer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileViewer2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileViewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
