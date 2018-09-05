import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {User} from './user';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivarLoadgingAction, DesactivarLoadgingAction} from '../shared/ui.accions';
import {SetUserAction, UnsetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore,
              private store: Store<AppState>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fireUser: firebase.User) => {
      if (fireUser) {
        this.userSubscription = this.afDB.doc(`${fireUser.uid}/usuario`).valueChanges().subscribe((userObj:User) => {

          const user: User = {
            nombre: userObj.nombre,
            email: userObj.email,
            uid: userObj.uid
          };

          this.store.dispatch(new SetUserAction(user));
          this.usuario = user;
        })
      } else {
          this.usuario = null;
          this.userSubscription.unsubscribe();
          this.store.dispatch(new UnsetUserAction());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadgingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(resp => {

        const user: User = {nombre: nombre,
                            email: resp.user.email,
                            uid: resp.user.uid};

        this.afDB.doc(`${user.uid}/usuario`).set(user).then(() => {
              this.router.navigate(['/']);
              this.store.dispatch(new DesactivarLoadgingAction());
        }).catch(err => {
          Swal('Error al crear usuario', err.message, 'error');
          this.store.dispatch(new DesactivarLoadgingAction());
        });

      }).catch( err => {
      Swal('Error al crear usuario', err.message, 'error');
      this.store.dispatch(new DesactivarLoadgingAction());
    });

  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadgingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then( () => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadgingAction());
      }).catch( err => {
        Swal('Error en el login', err.message, 'error');
        this.store.dispatch(new DesactivarLoadgingAction());
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    //this.store.dispatch(new UnsetUserAction());
  }

  isAuth() {
    return this.afAuth.authState.pipe(map( fbUser => {

      const auth = fbUser != null;

      if (!auth)
        this.router.navigate(['/login']);

      return auth;
    }));
  }

  getUsuario() {
    return {...this.usuario};
  }
}
