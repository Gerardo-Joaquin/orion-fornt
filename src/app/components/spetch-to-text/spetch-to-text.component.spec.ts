import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpetchToTextComponent } from './spetch-to-text.component';

describe('SpetchToTextComponent', () => {
  let component: SpetchToTextComponent;
  let fixture: ComponentFixture<SpetchToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpetchToTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpetchToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
