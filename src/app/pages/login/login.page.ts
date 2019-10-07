import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email: string = null;
  protected pws: string = null;
  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.login();
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        console.log(res.user);
      },
      erro => {
        console.log("Erro: " + erro);
      }
    ).catch(
      erro => {
        console.log("Erro no sistema: " + erro)
      }
    )
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
