import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-list-list-game',
  templateUrl: './list-list-game.page.html',
  styleUrls: ['./list-list-game.page.scss'],
})
export class ListListGamePage implements OnInit {

  protected game: any;

  constructor(
    protected gameService: GameService
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
