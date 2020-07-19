import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {UserInterface} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user$: Observable<UserInterface>;

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<UserInterface>(`users/${user.uid}`).valueChanges();
      } else {
        return null;
      }
    }));
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.clear();
  }

  private updateUserData({uid, email, displayName, photoURL}: User) {
    console.log({uid, email, displayName, photoURL});
    const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`users/${uid}`);
    return userRef.set({uid, email, displayName, photoURL}, {merge: true});
  }
}
