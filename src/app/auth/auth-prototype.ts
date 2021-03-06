import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../app.reducer';

export class AuthPrototype implements OnInit, OnDestroy{

  cargando: boolean;
  subscription: Subscription = new Subscription();
  store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select('ui')).subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
