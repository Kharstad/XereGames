import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { MensagemService } from '../../services/mensagem.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email: string = null;
  protected pws: string = null;
  constructor(
    public afAuth: AngularFireAuth,
    protected msg: MensagemService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.login();
  }

  login() {
    this.msg.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        console.log(res.user);
        this.msg.dismissLoading();
        this.router.navigate(['/'])
      },
      erro => {
        console.log("Erro: " + erro);
        this.msg.presentAlert("Erro!", "E-mail ou senha invalidos!");
        this.msg.dismissLoading();
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

  loginGoogle(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      res=>{
        console.log(res);
        this.router.navigate(['/'])
      },
      erro=>{
        console.log("Erro: ", erro);
        this.msg.presentAlert("Erro!", "Login invalido!");
      }
    );
  }

}
