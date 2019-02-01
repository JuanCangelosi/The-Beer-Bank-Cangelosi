import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';
import { BeerBackendService } from '../_serviceBackend/beer-backend.service';
import { Beer } from '../_models';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-beer-dashboard',
  templateUrl: './beer-dashboard.component.html',
  styleUrls: ['./beer-dashboard.component.scss']
})
export class BeerDashboardComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  public breakpoint = 3;
  public rowHeight = '1:1';

  // Beers to show
  beers: Beer[] = [];

  // Used to bring the next page when we scroll to the end of the list
  private currentPage = 0;
  public notLoading = true;

  // Subscription to the breakpoint observer
  private breakPointObserverSubscription: Subscription;
  private scrollServiceSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private beerBackendService: BeerBackendService,
    private scrollService: ScrollService
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
  /**
   * We get the first 20 beers and the when the scroll event triggers we get 20 more.
   */
  async ngOnInit() {
    this.beers = await this.beerBackendService.getBeers(this.currentPage, 20).toPromise();
    this.currentPage++;
    this.scrollServiceSubscription = this.scrollService.scrolled.subscribe(async (scrolled) => {
      if (scrolled && this.notLoading) {
        this.notLoading = false;
        const moreBeers = await this.beerBackendService.getBeers(this.currentPage, 20).toPromise();
        this.beers.push(...moreBeers);
        this.currentPage++;
        this.notLoading = moreBeers.length > 0;
      }
    });
  }

  ngOnDestroy() {
    this.breakPointObserverSubscription.unsubscribe();
    this.scrollServiceSubscription.unsubscribe();
  }

  /**
   * When the user searches a beer the header emmits an event, so show the beers of that query
   * @param beersSearched: Beers result of the search
   */
  public onSearch(beersSearched: Beer[]) {
    this.beers = beersSearched;
  }

}
