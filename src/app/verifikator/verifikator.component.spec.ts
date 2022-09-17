import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifikatorComponent } from './verifikator.component';

describe('VerifikatorComponent', () => {
  let component: VerifikatorComponent;
  let fixture: ComponentFixture<VerifikatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifikatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifikatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
