import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../model/game';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(game){
    return this.fire.collection("game").add({
      nome: game.nome,
      categoria: game.nome,
      console: game.console,
      descricao: game.descricao,
      quant: game.quant,
      valor: game.valor,
      ativo: true,

    })
  }

  gelAll() {
    return this.fire.collection("game").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id){
    return this.fire.collection("game").doc<Game>(id).valueChanges();
  }

  update(game, id){
    return this.fire.collection("game").doc<Game>(id).update(game); 
  }

  remove(game:any){
    return this.fire.collection("game").doc(game.key).delete(); 
  }
}
