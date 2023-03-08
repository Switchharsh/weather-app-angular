import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiphotoComponent } from './apiphoto.component';

describe('ApiphotoComponent', () => {
  let component: ApiphotoComponent;
  let fixture: ComponentFixture<ApiphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiphotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
