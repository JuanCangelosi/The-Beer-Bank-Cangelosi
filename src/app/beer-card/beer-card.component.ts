import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../_models';
import { BeerStateService } from '../_serviceState/beer-state.service';
import { MatDialog } from '@angular/material';
import { BeerModalComponent } from '../beer-modal/beer-modal.component';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {

  /**
   * The card receives a beer as parameter, this is the beer whose information the
   * card will show
   */
  @Input() beer: Beer;

  constructor(private beerStateService: BeerStateService, private dialog: MatDialog ) { }

  ngOnInit() {
  }

  /**
   * When the card is clicked it should open a dialog with the beer information
   */
  openDialog(): void {
    this.beerStateService.selectedBeer = this.beer;
    const dialogRef = this.dialog.open(BeerModalComponent,  {
      width: '850px'
    });
  }

  /**
   * If the star is clicked it should either favourite the beer or unfavourite it depending
   * on the state.
   */
  public addFavourite(event) {
    event.stopPropagation();
    if (this.beerStateService.isFavourite(this.beer)) {
      this.beer.is_favourite = false;
      this.beerStateService.removeFavouriteBeer(this.beer);
    } else {
      this.beer.is_favourite = true;
      this.beerStateService.addFavouriteBeer(this.beer);
    }
  }

  /**
   * Method used to check if the beer is favourited or not.
   */
  public isFavourite() {
    return this.beerStateService.isFavourite(this.beer);
  }

}
