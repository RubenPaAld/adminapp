import {User} from '../auth/user';
import {AppState} from '../app.reducer';
import {select, Store} from '@ngrx/store';
import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

export class OnUserPrototype implements OnInit, OnDestroy{

   user: User;
   userSubscription: Subscription = new Subscription();
   store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;

  }

  ngOnInit() {
    this.userSubscription = this.store.pipe(select('auth'),filter(auth => auth.user != null)).subscribe(auth => {
      this.user = auth.user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
