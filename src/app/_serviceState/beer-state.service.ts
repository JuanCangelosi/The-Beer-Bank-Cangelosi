import { Injectable } from '@angular/core';
import { Beer } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class BeerStateService {

  // Beer that has been selected to be shown
  private _selectedBeer: Beer;

  // Map of the beers with a boolean to decide if they are or not favourited.
  private _favouriteBeers: Map<Beer, boolean> = new Map<Beer, boolean>();

  constructor() { }

  public get selectedBeer(): Beer {
    const selectedBeer = this._selectedBeer;
    return this._selectedBeer;
  }
  public set selectedBeer(value: Beer) {
    this._selectedBeer = value;
  }

  /**
   * Returns all the favourited beers
   */
  public getFavouriteBeers(): Beer[] {
    const keys = Array.from( this._favouriteBeers.keys() );
    return keys.filter((key) => {
      return this._favouriteBeers.get(key);
    });
  }

  /**
   * Adds a new favourite beer
   * @param newFavourite beer to add
   */
  public addFavouriteBeer(newFavourite: Beer) {
    this._favouriteBeers.set(newFavourite, true);
  }

  /**
   * "removes" beer from favourites
   * @param beerToRemove beer to remove
   */
  public removeFavouriteBeer(beerToRemove: Beer) {
    this._favouriteBeers.set(beerToRemove, false);
  }

  /**
   * Returns true if the beer is favourite, false at contrary.
   * @param beerToCheck beer to check if its favourited.
   */
  public isFavourite(beerToCheck: Beer) {
    return this._favouriteBeers.get(beerToCheck) ? true : false;
  }
}
