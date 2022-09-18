import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassDialogComponent } from './update-pass-dialog.component';

describe('UpdatePassDialogComponent', () => {
  let component: UpdatePassDialogComponent;
  let fixture: ComponentFixture<UpdatePassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
