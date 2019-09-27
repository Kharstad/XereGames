import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  protected game: Game = new Game;

  constructor(
    protected gameService: GameService,
    protected alertController: AlertController,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  onsubmit(form) {
    this.gameService.save(this.game).then(
      res => {
        form.reset();
        this.game = new Game;
        this.presentAlert("Aviso", "Game Cadastrado!")
        this.router.navigate(['/tabs/listGame']);
      },
      erro => {
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Não foi possivel cadastrar!")
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

}
