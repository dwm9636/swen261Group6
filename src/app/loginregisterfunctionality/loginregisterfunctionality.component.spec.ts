import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginregisterfunctionalityComponent } from './loginregisterfunctionality.component';

describe('LoginregisterfunctionalityComponent', () => {
  let component: LoginregisterfunctionalityComponent;
  let fixture: ComponentFixture<LoginregisterfunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginregisterfunctionalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginregisterfunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
