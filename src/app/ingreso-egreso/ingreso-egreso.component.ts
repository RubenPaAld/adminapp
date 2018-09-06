import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso, tiposValidos} from './ingreso-egreso.model';
import {IngresoEgresoService} from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import {AuthPrototype} from '../auth/auth-prototype';
import {Store} from '@ngrx/store';
import {AppState} from './ingreso-egreso.reducer';
import {ActivarLoadgingAction, DesactivarLoadgingAction} from '../shared/ui.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent extends AuthPrototype implements OnInit {

  forma: FormGroup;
  tipo: tiposValidos = tiposValidos.egreso;
  tiposValidos = tiposValidos;

  constructor(private ingresoEgresoService: IngresoEgresoService, store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    super.ngOnInit();

    this.forma = new FormGroup(({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(1, Validators.min(1))
    }));
  }

  crear() {

    this.store.dispatch(new ActivarLoadgingAction());

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal('Creado',ingresoEgreso.descripcion,'success');
        this.forma.reset({
          monto: 1
        });
        this.store.dispatch(new DesactivarLoadgingAction());
      }).catch(err => {
        Swal('Error',err,'error');
        this.store.dispatch(new DesactivarLoadgingAction());
      });
  }
}
