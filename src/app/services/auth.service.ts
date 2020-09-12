import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first,  switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../model/User';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  public isLoggedIn: boolean;
  
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user && user.emailVerified) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
  )
  //  this.user$ = this.getCurrentUser().then(user => {
  //    if(user) {
  //      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
  //    } else {
  //      return of(null);
  //    }
  //  })

  }

  async login(email: string, password: string) {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      let userObj: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      };
      await this.updateUserData(userObj);
      return userObj;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email:string): Promise<void> {

      try{

        return this.afAuth.sendPasswordResetEmail(email);
      }catch(error){console.log(error)}

  }

  async registro(email: string, password: string, displayName: string) {
    try {
      const { user } =  await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      let userObj: User = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        emailVerified: user.emailVerified
      };
      await this.updateUserData(userObj)
      return userObj;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.isLoggedIn = false;
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User): Promise<void> {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName
      }
      const userObj = this.afAuth.currentUser;
      userObj.then(result => {
        result.updateProfile({
          displayName: user.displayName
        }).then((value) =>{
          // everything ok
        })
      })
      return userRef.set(data, {merge: true});
    } catch (e) {
      throw e;
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    }catch (e) {
      console.log(e);
    }
  }
}
