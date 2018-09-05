import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Auth} from '../auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent extends Auth{

  constructor(public  authService: AuthService,  store: Store<AppState>) {
    super(store);
  }

  onSubmit(data:any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password)
  }

}
