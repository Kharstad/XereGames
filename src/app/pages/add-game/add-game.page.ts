import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'], 
})
export class AddGamePage implements OnInit {

  protected game: Game = new Game;
  protected id: any = null; 
  protected preview: any = null;

  constructor(
    protected gameService: GameService,
    protected alertController: AlertController,
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private camera: Camera,

  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.gameService.get(this.id).subscribe(
        res => {
          this.game = res
        },
        erro => this.id = null
      )
    }
  }

  onsubmit(form) {

      if (!this.id) {
        this.gameService.save(this.game).then(
          res => {
            form.reset();
            this.game = new Game;
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/tabs/listGame']);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel cadastrar!")
          }
        )
      } else {

      }
      this.gameService.update(this.game, this.id).then(
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

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
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
