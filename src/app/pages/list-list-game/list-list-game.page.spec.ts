import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListGamePage } from './list-list-game.page';

describe('ListListGamePage', () => {
  let component: ListListGamePage;
  let fixture: ComponentFixture<ListListGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListListGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListListGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
