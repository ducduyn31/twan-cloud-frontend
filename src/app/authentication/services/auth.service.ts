import {Injectable} from '@angular/core';
import {StorageService} from '../../shared/services/storage/storage.service';
import {Router} from '@angular/router';
import {User} from '../../shared/interfaces/user';
import {Subject} from 'rxjs';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import {Firestore, DocumentReference, doc, updateDoc} from '@angular/fire/firestore';
import {User as FirebaseUser} from 'firebase/auth/dist/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  currentUser: Subject<FirebaseUser | null> = new Subject();
  currentToken: string | null = null;

  constructor(
    private afs: Firestore,
    private afAuth: Auth,
    private storage: StorageService,
    private router: Router,
  ) {
    this.afAuth.setPersistence({type: 'SESSION'});
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser?.next(user);
      user?.getIdToken().then((token) => this.currentToken = token);
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const userCred = await signInWithEmailAndPassword(this.afAuth, email, password);
      if (!userCred.user) {
        return;
      }
      this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/auth');
  }

  private async updateUser(user: FirebaseUser): Promise<void> {
    const userRef: DocumentReference<any> = doc(this.afs, `user/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified,
    };
    return updateDoc(userRef, userData);
  }
}
