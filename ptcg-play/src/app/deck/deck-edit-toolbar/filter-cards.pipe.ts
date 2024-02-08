import { Pipe, PipeTransform } from '@angular/core';

import { DeckEditToolbarFilter } from './deck-edit-toolbar-filter.interface';
import { Card, CardType, SuperType, PokemonCard, EnergyCard, CardTag, Format, TrainerCard, Stage } from 'ptcg-server';
import { LibraryItem } from '../deck-card/deck-card.interface';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {

  transform(items: LibraryItem[], filter: DeckEditToolbarFilter): any {

    if (filter === undefined) {
      return items;
    }

    if (!filter.searchValue
      && filter.superTypes.length === 0
      && filter.stages.length === 0
      && filter.cardTypes.length === 0
      && filter.energyTypes.length === 0
      && filter.trainerTypes.length === 0
      && filter.tags.length === 0
      && filter.attackCosts.length === 0
      && filter.retreatCosts.length === 0
      && filter.formats.length === 0) {
      return items;
    }

    return items.filter(item => {
      const card = item.card;
      if (!!filter.searchValue && !this.matchCardText(card, filter.searchValue)) {
        return false;
    }

      if (filter.superTypes.length && !filter.superTypes.includes(card.superType)) {
        return false;
      }
      
      if (filter.superTypes.includes(SuperType.POKEMON) && 
         ((filter.hasAbility && (card as PokemonCard).powers?.length === 0) || 
         (!filter.hasAbility && (card as PokemonCard).powers?.length > 0))) {
        return false
      }
      
      if (filter.stages.length && !filter.stages.includes((card as PokemonCard).stage)) {
        return false;
      }
      
      if (filter.energyTypes.length && !filter.energyTypes.includes((card as EnergyCard).energyType)) {
        return false;
      }
      
      if (filter.trainerTypes.length && !filter.trainerTypes.includes((card as TrainerCard).trainerType)) {
        return false;
      }
      
      if (filter.retreatCosts.length && !this.matchRetreatCosts(filter.retreatCosts, card)) {
        return false;
      }
      
      if (filter.attackCosts.length && !this.matchAttackCosts(filter.attackCosts, card)) {
        return false;
      }

      if (filter.cardTypes.length && (!filter.cardTypes.includes(this.getCardType(card)) && !filter.cardTypes.includes(CardType.ANY))) {
        return false;
      }

      if (filter.tags.length && !filter.tags.includes(this.getTags(card))) {
        return false;
      }

      if (filter.formats.length && !filter.formats.some(f => this.getFormats(card).includes(f))) {
        return false;
      }

      return true;
    });
  }
  
  private matchCardText(card: Card, searchValue: string) {
    const lowerCaseSearchValue = searchValue.toLocaleLowerCase();
    if (card.name.toLocaleLowerCase().includes(lowerCaseSearchValue))
      return true;
    
    if (card.setNumber.toLocaleLowerCase().includes(lowerCaseSearchValue))
      return true;
    
    if (card.set.toLocaleLowerCase().includes(lowerCaseSearchValue))
      return true;
    
    const pokemonCard = card as PokemonCard;
    if (pokemonCard.attacks?.some(a => a.name.toLocaleLowerCase().includes(lowerCaseSearchValue)))
      return true;
    
    if (pokemonCard.attacks?.some(a => a.text.toLocaleLowerCase().includes(lowerCaseSearchValue)))
      return true;
  
    const trainerCard = card as TrainerCard;
    if (trainerCard.text?.toLocaleLowerCase().includes(lowerCaseSearchValue))
      return true;
    
    const energyCard = card as EnergyCard;
    if (energyCard.text?.toLocaleLowerCase().includes(lowerCaseSearchValue))
      return true;
  }
  
  private matchRetreatCosts(retreatCosts: number[], card: Card): boolean {
    const pokemonCard = card as PokemonCard;
    
    if (pokemonCard.retreat === undefined) return false;
    
    const retreat = pokemonCard.retreat;
    
    if (retreatCosts.includes(0) && !card.retreat.length) {
      return true;
    }
    
    return retreatCosts.includes(retreat.length);
  }
  
  private matchAttackCosts(attackCosts: number[], card: Card): boolean {
    const pokemonCard = card as PokemonCard;
    
    if (pokemonCard.attacks === undefined) return false;    
    
    const attacks = pokemonCard.attacks;
    
    if (attackCosts.includes(0) && attacks.map(a => a.cost.length).filter(c => c === 0).length >= 1) {
      return true;
    }
    
    return attackCosts.some(c => attacks.map(a => a.cost.length).includes(c));
  }
  
  private getTags(card: Card): CardTag {
    if (card.tags.includes(CardTag.POKEMON_V)) {
      return CardTag.POKEMON_V;
    }
    if (card.tags.includes(CardTag.POKEMON_VSTAR)) {
      return CardTag.POKEMON_VSTAR;
    }
    if (card.tags.includes(CardTag.POKEMON_VMAX)) {
      return CardTag.POKEMON_VMAX;
    }
  }

  private getFormats(card: PokemonCard | TrainerCard | Card): Format[] {
    const formats: Format[] = [];
    formats.push(Format.UNLIMITED);

    if (card.regulationMark === 'ENERGY' || card.regulationMark === 'E' || card.regulationMark === 'F' || card.regulationMark === 'G' || card.regulationMark === 'H') {
      formats.push(Format.STANDARD);
    }

    if (card.regulationMark === 'ENERGY') {
      formats.push(Format.EXPANDED);
    }

    if (card.regulationMark === 'ENERGY' || card.set === 'BS' || card.set === 'JU' || card.set === 'FO' || card.set ==='PR') {
      formats.push(Format.RETRO);
    }

    return formats;
  }


  private getCardType(card: Card): CardType {
    if (card.superType === SuperType.POKEMON) {
      return (card as PokemonCard).cardType;
    }
    
    if (card.superType === SuperType.ENERGY) {
      const energyCard = card as EnergyCard;
      if (energyCard.provides.length > 0) {
        return energyCard.provides[0];
      }
    }
    return CardType.NONE;
  }

}