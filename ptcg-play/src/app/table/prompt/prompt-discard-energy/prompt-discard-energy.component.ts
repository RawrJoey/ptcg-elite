import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Card, CardTarget, DiscardEnergyPrompt, FilterType, SuperType } from 'ptcg-server';
import { GameService } from '../../../api/services/game.service';
import { LocalGameState } from '../../../shared/session/session.interface';
import { PokemonData, PokemonItem } from '../choose-pokemons-pane/pokemon-data';
import { CardsContainerComponent } from '../cards-container/cards-container.component';

interface DiscardEnergyResult {
  from: PokemonItem;
  card: Card;
  container: CardsContainerComponent;
}

@Component({
  selector: 'ptcg-prompt-discard-energy',
  templateUrl: './prompt-discard-energy.component.html',
  styleUrls: ['./prompt-discard-energy.component.scss']
})
export class PromptDiscardEnergyComponent implements OnInit {
  @Input() prompt: DiscardEnergyPrompt;
  @Input() gameState: LocalGameState;
  @ViewChild('cardsContainer') cardsContainer: CardsContainerComponent;

  public pokemonData: PokemonData;
  public selectedItem: PokemonItem | undefined;
  public currentPokemonCards: Card[] = [];
  public results: DiscardEnergyResult[] = [];
  public isInvalid = true;
  public blocked: number[] = [];
  public filter: FilterType;
  public max: number | undefined;
  public allowedCancel: boolean;

  private selectedEnergies: DiscardEnergyResult[] = [];
  private availableEnergyCards = new Map<PokemonItem, Card[]>();
  private selectedEnergyCards = new Map<PokemonItem, Card[]>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    if (this.prompt && this.gameState) {
      this.initializePrompt();
    }
  }

  private initializePrompt(): void {
    const state = this.gameState.state;
    this.pokemonData = new PokemonData(
      state,
      this.prompt.playerId,
      this.prompt.playerType,
      this.prompt.slots
    );

    this.filter = this.prompt.filter;
    this.max = this.prompt.options.max;
    this.allowedCancel = this.prompt.options.allowCancel;

    // Log 1: Available energy validation
    this.pokemonData.getRows().forEach(row => {
      row.items.forEach(item => {
        const energyCards = item.cardList.cards.filter(
          card => card.superType === SuperType.ENERGY
        );
        console.log('Available energy cards for Pokemon:', item.target, energyCards);
        if (energyCards.length > 0) {
          this.availableEnergyCards.set(item, [...energyCards]);
        }
      });
    });
  }

  public onCardClick(item: PokemonItem): void {
    if (this.selectedItem) {
      this.selectedItem.selected = false;
    }

    this.selectedItem = item;
    this.selectedItem.selected = true;

    // Log 2: Card list validation when switching Pokemon
    console.log('Switching to Pokemon:', item.target);
    this.currentPokemonCards = item.cardList.cards.filter(card =>
      card.superType === SuperType.ENERGY &&
      !this.selectedEnergies.some(selected => selected.card === card)
    );
    console.log('Available energy cards for selected Pokemon:', this.currentPokemonCards);

    this.validateSelection();
  }

  public onChange(indices: number[]): void {
    if (!this.selectedItem) return;

    console.log('Selected energy indices:', indices);

    // Use Set to ensure unique selections
    const uniqueIndices = [...new Set(indices)];
    const newSelections = uniqueIndices
      .map(index => this.currentPokemonCards[index])
      .filter(card => card.superType === SuperType.ENERGY)
      .map(card => ({
        from: this.selectedItem!,
        card,
        container: this.cardsContainer
      }));

    console.log('New energy selections:', newSelections);

    // Update selections for current Pokemon only
    this.selectedEnergies = [
      ...this.selectedEnergies.filter(result => result.from !== this.selectedItem),
      ...newSelections
    ];

    this.results = [...this.selectedEnergies];
    this.validateSelection();
  }


  private validateSelection(): void {
    const totalSelected = this.selectedEnergies.length;
    const selectedTransfers = this.selectedEnergies.map(result => ({
      from: result.from.target,
      to: null,
      card: result.card
    }));

    this.isInvalid = totalSelected === 0 ||
      totalSelected < this.prompt.options.min ||
      (this.prompt.options.max !== undefined && totalSelected > this.prompt.options.max) ||
      !this.prompt.validate(selectedTransfers);
  }

  public reset(): void {
    this.selectedEnergies = [];
    this.results = [];
    this.selectedItem = undefined;

    this.pokemonData.getRows().forEach(row => {
      row.items.forEach(item => {
        item.selected = false;
      });
    });

    this.validateSelection();
  }

  public confirm(): void {
    // Log 4: Final validation and confirmation
    console.log('Confirming energy selection:', this.results);
    const results = this.results.map(result => ({
      from: result.from.target,
      index: result.from.cardList.cards.indexOf(result.card),
      container: result.container
    }));
    console.log('Final results to be sent:', results);

    this.gameService.resolvePrompt(
      this.gameState.gameId,
      this.prompt.id,
      results
    );
  }

  public minimize(): void {
    this.gameService.setPromptMinimized(this.gameState.localId, true);
  }

  public cancel(): void {
    this.gameService.resolvePrompt(
      this.gameState.gameId,
      this.prompt.id,
      null
    );
  }
}
