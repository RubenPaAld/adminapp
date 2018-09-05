import { Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {OnUserPrototype} from '../on-user-prototype';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {IngresoEgresoService} from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent extends OnUserPrototype {

  constructor(public authService: AuthService, store: Store<AppState>,
              private ieService: IngresoEgresoService) {
    super(store);
  }

  logout() {
    this.authService.logout();
    this.ieService.cancelarSubscriptions();
  }

}
