import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderEditComponent } from './workorder-edit.component';

describe('WorkorderEditComponent', () => {
  let component: WorkorderEditComponent;
  let fixture: ComponentFixture<WorkorderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
