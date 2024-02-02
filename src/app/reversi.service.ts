import { computed, Injectable ,signal,Signal, WritableSignal} from '@angular/core';
import {GameState, ReversiModelInterface ,TileCoords} from './data/reversi.definitions';
import {initialGameState} from './data/reversi.game'
import{tryPlay}from'./data/reversi.game'

@Injectable({
  providedIn: 'root'
})
export class ReversiService implements ReversiModelInterface{
 // Signal privé en écriture
 private readonly _sigGameState: WritableSignal<GameState> = signal<GameState>(initialGameState);
 // WritableSignal<GameState> : cela on peut l'enlever car déja un signal primaire on peut modifier dedans et mais pas en signal dérivé c'est pour cela on a  dérivé le signal pour qu''il soit que signal en lecture

 // Signal public en lecture seule
 public readonly sigGameState: Signal<GameState>=computed(this._sigGameState) ;

constructor() { 

}
play(coord: TileCoords): void{
  // Récupérer l'état actuel du jeu
  const currentState: GameState = this._sigGameState();

    // on fait la mise à jour les cases  avec le tour du joueur courant cette méthode s'assure elle même si la case est Empty
    const newState: GameState =tryPlay(currentState,coord[0],coord[1]);

  // Mettre à jour _sigGameState avec le nouvel état du jeu
  this._sigGameState.set(newState);
}

  restart(): void {
    // Implémentez la logique pour redémarrer une partie à l'état initial ici
    // Par exemple, réinitialisez _sigGameState avec initialGameState
    this._sigGameState.set(initialGameState);
  }

}