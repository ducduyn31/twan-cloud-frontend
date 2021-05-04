import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {StorageService} from '../../shared/services/storage/storage.service';
import {Router} from '@angular/router';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import FirebaseUser = firebase.User;
import {User} from '../../shared/interfaces/user';
import {CONFIG} from '@angular/fire/analytics';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: StorageService,
    private router: Router,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.storage.set('user', this.userData);
      }
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user) { return; }
      }).catch(e => console.error(e));
  }

  private updateUser(user: FirebaseUser): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
