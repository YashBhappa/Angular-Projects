import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotSideComponent } from './bot-side.component';

describe('BotSideComponent', () => {
  let component: BotSideComponent;
  let fixture: ComponentFixture<BotSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
