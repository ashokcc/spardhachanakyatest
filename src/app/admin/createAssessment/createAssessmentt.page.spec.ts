import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessmentPage } from './createAssessment.page';

describe('CreateAssessmentPage', () => {
  let component: CreateAssessmentPage;
  let fixture: ComponentFixture<CreateAssessmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssessmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
