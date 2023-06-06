import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakersPageComponent } from './makers-page.component';

describe('MakersPageComponent', () => {
  let component: MakersPageComponent;
  let fixture: ComponentFixture<MakersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakersPageComponent]
    });
    fixture = TestBed.createComponent(MakersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
