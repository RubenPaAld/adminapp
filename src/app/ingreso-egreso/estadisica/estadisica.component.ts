import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IngresoEgreso, tiposValidos} from '../ingreso-egreso.model';
import {AppState} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadisica',
  templateUrl: './estadisica.component.html',
  styles: []
})
export class EstadisicaComponent implements OnInit {

  ingresos: number = 0;
  numIngresos: number = 0;
  egresos: number = 0;
  numEgresos: number = 0;
  subscription: Subscription = new Subscription();

  doughnutChartLabels:string[] = ['Ingresos', 'egresos'];
  doughnutChartData:number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.pipe(select('ingresoEgreso')).subscribe(ie => {
      this.contar(ie.items);
    });
  }

  contar(items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.numIngresos = 0;
    this.egresos = 0;
    this.numEgresos = 0;

    items.forEach( item => {
      if (item.tipo == tiposValidos.ingreso) {
          this.numIngresos ++;
          this.ingresos += item.monto;
      } else {
        this.numEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];

  }

}
