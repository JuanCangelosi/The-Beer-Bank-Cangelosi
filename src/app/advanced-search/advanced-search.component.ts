import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';
import { BeerBackendService } from '../_serviceBackend/beer-backend.service';
import { BeerAdvancedSearch } from '../_models';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AdvancedSearchComponent implements OnDestroy {
  // We createe the form with the inputs we need
  searchForm = new FormGroup({
    minIbu: new FormControl(),
    maxIbu: new FormControl(),
    minAbv: new FormControl(),
    maxAbv: new FormControl(),
    minEbc: new FormControl(),
    maxEbc: new FormControl(),
    brewedBefore: new FormControl(''),
    brewedAfter: new FormControl(''),
  });

  /** Based on the screen size, switch from standard to one column per row */
  public breakpoint = 3;
  public rowHeight = '1:1';
  beers;

  public showLoading = false;

  private breakPointObserverSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private beerBackendService: BeerBackendService
  ) {
    // When the breakpointObserver changes we check the breakpoint and then we
    // set the correct rows and ratio for them
    this.breakPointObserverSubscription = this.breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large]
    ).subscribe(observer => {
      if (observer.breakpoints[Breakpoints.XSmall]) {
        this.breakpoint = 1;
        this.rowHeight = '1:1.4';
      }
      if (observer.breakpoints[Breakpoints.Small]) {
        this.breakpoint = 1;
        this.rowHeight = '1:0.7';
      }
      if (observer.breakpoints[Breakpoints.Medium]) {
        this.breakpoint = 2;
        this.rowHeight = '1:0.9';
      }
      if (observer.breakpoints[Breakpoints.Large]) {
        this.breakpoint = 3;
        this.rowHeight = '1: 1.2';
      }
    });
  }

  ngOnDestroy() {
    this.breakPointObserverSubscription.unsubscribe();
  }

  /**
   * Method called when the user submits the search form, we
   * create a model used for the search query and send it to
   * the backend method setting as result the beers of the query.
   * @param event: submit event
   */
  public onSubmit(event) {
    this.showLoading = true;
    // We must manage the dates as MM-YYYY according to the doc
    const beerAdvancedQuery: BeerAdvancedSearch = {
      ibu_gt: this.searchForm.value.minIbu,
      ibu_lt: this.searchForm.value.maxIbu,
      abv_gt: this.searchForm.value.minAbv,
      abv_lt: this.searchForm.value.maxAbv,
      ebc_gt: this.searchForm.value.minEbc,
      ebc_lt: this.searchForm.value.maxEbc,
      brewed_before:
        this.searchForm.value.brewedBefore ?
          this.searchForm.value.brewedBefore.getMonth() + '-' + this.searchForm.value.brewedBefore.getFullYear()
          : null,
      brewed_after:
        this.searchForm.value.brewedAfter ?
          this.searchForm.value.brewedAfter.getMonth() + '-' + this.searchForm.value.brewedAfter.getFullYear()
          : null
    };
    const res = this.beerBackendService.advancedBeerSearch(beerAdvancedQuery);
    this.beers = res;
  }

  /**
   * Method used to handle the year selection event of the date inputs
   * @param formField form param to asign the value
   * @param year year to assing
   */
  chosenYearHandler(formField, year) {
    this.searchForm.get(formField).setValue(year);
  }

  /**
   * Method used to handle the month selection event of the date inputs
   * @param formField form param to asign the value
   * @param month month to assing
   * @param datepicker passed as parameter to close it after selection
   */
  chosenMonthHandler(formField, month, datepicker) {
    this.searchForm.get(formField).setValue(month);
    datepicker.close();
  }

}
