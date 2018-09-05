import { Component } from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {OnUserPrototype} from '../on-user-prototype';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent extends OnUserPrototype {

  constructor(store: Store<AppState>) {
    super(store);
  }
}
