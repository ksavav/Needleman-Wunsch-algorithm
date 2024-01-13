import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaymatrixComponent } from './displaymatrix.component';

describe('DisplaymatrixComponent', () => {
  let component: DisplaymatrixComponent;
  let fixture: ComponentFixture<DisplaymatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaymatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaymatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
