import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Service used to communicate between parent and children to notify them that the container is
 * scrolling.
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  public scrolled: Subject<boolean> = new Subject<boolean>();
  constructor() { }
}
