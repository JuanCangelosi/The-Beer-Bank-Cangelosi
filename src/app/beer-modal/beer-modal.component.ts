import { Component, OnInit } from '@angular/core';
import { Beer } from '../_models';
import { BeerStateService } from '../_serviceState/beer-state.service';
import { BeerBackendService } from '../_serviceBackend/beer-backend.service';
import { Observable, concat } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-beer-modal',
  templateUrl: './beer-modal.component.html',
  styleUrls: ['./beer-modal.component.scss']
})
export class BeerModalComponent implements OnInit {

  // Beer to show in the dialog
  public beer: Beer;

  // The beers at the bottom will be randomized
  public randomBeers: Beer[] = [];
  public max_random_beers = 3;

  constructor(
    private beerStateService: BeerStateService,
    private beerBackendService: BeerBackendService,
    public dialogRef: MatDialogRef<BeerModalComponent>
  ) {
    this.beer = this.beerStateService.selectedBeer;
  }
  // On Init we retrieve 3 random beers to fill the array
  async ngOnInit() {
    for (let i = 0; i < this.max_random_beers; i++) {
      const randomBeer = await this.beerBackendService.getRandomBeer().toPromise();
      this.randomBeers.push(...randomBeer);
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

}
