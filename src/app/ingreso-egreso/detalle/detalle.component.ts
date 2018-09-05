import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IngresoEgreso, tiposValidos} from '../ingreso-egreso.model';
import {IngresoEgresoService} from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ieSubscription: Subscription = new Subscription();
  items: IngresoEgreso[];
  tiposValidos = tiposValidos;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ieSubscription = this.store.pipe(select('ingresoEgreso')).subscribe(ie => {
      this.items = ie.items;
    });
  }

  ngOnDestroy(): void {
    this.ieSubscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then( () =>
      Swal('Eliminado', item.descripcion, 'success')
    ).catch( err =>
      Swal('Error', err, 'error')
    );
  }
}
