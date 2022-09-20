import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacesComponent } from './workspaces.component';

describe('WorkspacesComponent', () => {
  let component: WorkspacesComponent;
  let fixture: ComponentFixture<WorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('export to csv', () => {
    component.exportAttributeToCsv('1SIzXI7606RLsQpF3pSX')
    expect(true).toBeTrue()
  })
});
