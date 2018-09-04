import {Routes} from '@angular/router';
import {EstadisicaComponent} from '../ingreso-egreso/estadisica/estadisica.component';
import {IngresoEgresoComponent} from '../ingreso-egreso/ingreso-egreso.component';
import {DetalleComponent} from '../ingreso-egreso/detalle/detalle.component';

export const dashboardRoutes: Routes = [
  {path: '', component: EstadisicaComponent},
  {path: 'ingreso-egreso', component: IngresoEgresoComponent},
  {path: 'detalle', component: DetalleComponent}
];
