import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScrollService } from '../scroll.service';

/**
 * This component will contain the main layout of the application
 * The layout will be 2 parts:
 * -The Header where there will be 2 buttons: Home & Favourites
 * -The body where the pages will render
 */
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  /*   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
   */

  public delay = 3000;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private scrollService: ScrollService
  ) { }

  /**
   * Method called when the sidenav-content is scrolled
   * It checkes if the user is in the bottom of the scroll and if so it notifies
   * the directive.
   * @param event: ScrollEvent to check
   */
  public onScroll(event) {
    if (event.srcElement.offsetHeight + event.srcElement.scrollTop === event.srcElement.scrollHeight) {
      this.scrollService.scrolled.next(true);
    }
  }
}
