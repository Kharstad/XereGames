import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.page.html',
  styleUrls: ['./list-game.page.scss'],
})
export class ListGamePage implements OnInit {

  protected game: any;

  constructor(
    protected gameService: GameService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.gameService.gelAll().subscribe(
      res => {
        this.game = res;
      }
    )
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.gameService.gelAll().subscribe(
      res => {
         this.game = res;
        setTimeout(() => {
          event.target.complete();
        }, 0);
      }
    );
  }
}
