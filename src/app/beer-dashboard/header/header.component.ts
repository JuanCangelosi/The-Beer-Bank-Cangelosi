import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Beer } from 'src/app/_models';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BeerBackendService } from 'src/app/_serviceBackend/beer-backend.service';
import { Router } from '@angular/router';

/**
 * Component that contains the title of the dashboard and the search bar
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchCtrl = new FormControl();
  searchBeers: Beer[];

  // When the user searches beers we emmit an event that the dashboard will use
  @Output() searchedBeers: EventEmitter<Beer[]> = new EventEmitter<Beer[]>();

  searchSubscription: Subscription;

  constructor(
    private beerBackendService: BeerBackendService,
    private router: Router
  ) {
    // We use the search form control to create the search
    this.searchSubscription = this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.beerBackendService.searchByBeerName(value),
        )).subscribe((beers) => {
          this.searchBeers = beers;
          this.searchedBeers.emit(beers);
        });
  }

  ngOnInit() {
  }

  /**
   * This could be a router-link-active, its a method just in case
   * When the user clickes advanced search this method is called,
   * it navigates to advanced search
   */
  public advancedSearch() {
    this.router.navigate(['/advanced-search']);
  }
}
