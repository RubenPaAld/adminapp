import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {AuthPrototype} from '../auth-prototype';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent extends AuthPrototype{

  constructor(private authService: AuthService, store: Store<AppState>) {
    super(store);
  }

  onLogin(f: any) {
    this.authService.login(f.email,f.password);
  }
}
