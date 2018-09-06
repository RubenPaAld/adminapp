import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {EstadisicaComponent} from './estadisica/estadisica.component';
import {DetalleComponent} from './detalle/detalle.component';
import {OrderByPipe} from './order-by.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {ShareModule} from '../shared/share.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {StoreModule} from '@ngrx/store';
import {ingresoEgresoReducer} from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    ShareModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
  ],
  declarations: [
    DashboardComponent,

    IngresoEgresoComponent,
    EstadisicaComponent,
    DetalleComponent,
    OrderByPipe,
  ]
})
export class IngresoEgresoModule { }
