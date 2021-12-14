import {Injectable} from '@angular/core';
import {StorageService} from '../../shared/services/storage/storage.service';
import {Router} from '@angular/router';
import {User} from '../../shared/interfaces/user';
import {Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import FirebaseUser = firebase.User;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  currentUser: Subject<FirebaseUser | null> = new Subject();
  currentToken: string | null = null;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: StorageService,
    private router: Router,
  ) {
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.afAuth.authState.subscribe((user) => {
      this.currentUser?.next(user);
      user?.getIdToken().then((token) => this.currentToken = token);
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user) {
          return;
        }
        this.router.navigateByUrl('/');
      }).catch(e => console.error(e));
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/auth');
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
