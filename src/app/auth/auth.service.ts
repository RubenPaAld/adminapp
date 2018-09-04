import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {User} from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {
    this.afAuth.auth.useDeviceLanguage();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fireUser: firebase.User) => {
      console.log(fireUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(resp => {

        const user: User = {nombre: nombre,
                            email: resp.user.email,
                            uid: resp.user.uid};

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user).then(() => {
          this.router.navigate(['/']);
        }).catch(err => {
          Swal('Error al crear usuario', err.message, 'error');
        });

      }).catch( err => {
      Swal('Error al crear usuario', err.message, 'error');
    });
    this.afAuth.auth.useDeviceLanguage();
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then( resp => {
        this.router.navigate(['/']);
      }).catch( err => {
        Swal('Error en el login', err.message, 'error');
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map( fbUser => {

      const auth = fbUser != null;

      if (!auth)
        this.router.navigate(['/login']);

      return auth;
    }));
  }
}
