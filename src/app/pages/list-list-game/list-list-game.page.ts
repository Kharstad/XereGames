import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-list-game',
  templateUrl: './list-list-game.page.html',
  styleUrls: ['./list-list-game.page.scss'],
})
export class ListListGamePage implements OnInit {

  protected game: any;

  constructor(
    protected gameService: GameService,
    private router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.refreshGame()
  }

  apagar(game: any) {
    this.presentAlertConfirm(game)
  }

  editar(game){
    this.router.navigate(['/tabs/addGame', game.key])
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.gameService.gelAll().subscribe(
      res => {
         this.game = res;
        setTimeout(() => {
          event.target.complete();
        }, 500);
      }
    );
  }

  refreshGame(){
    this.gameService.gelAll().subscribe(
      res=>{
        this.game = res;
      }
    )
  }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertConfirm(game) {
    const alert = await this.alertController.create({
      header: 'Apagar Game',
      message: 'Deseja realmente apagar o Game?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Confirm Okay');
            this.gameService.remove(game).then( 
              res=>{
                this.presentAlert("Aviso!", "Game deletado com sucesso");
                this.refreshGame()
              },
              erro=>{
                this.presentAlert("Erro!", "Falha ao deletar o Game")
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

}
