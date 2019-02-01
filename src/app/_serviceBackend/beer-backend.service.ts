import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer, BeerAdvancedSearch } from '../_models';
import { Observable } from 'rxjs';
/**
 * Service used to communicate with the beer API
 */
@Injectable({
  providedIn: 'root'
})
export class BeerBackendService {

  url = 'https://api.punkapi.com/v2/beers';

  constructor(private http: HttpClient) {
  }

  /**
   * Gets beers from the api
   * It can be paginated if pageNumber and pagesize are passed as parameters,
   * Otherwise it will return the first 25 beers.
   * @param pageNumber: number of the page to bring (>0)
   * @param pageSize: max ammount of beers to bring
   */
  public getBeers(pageNumber?: number, pageSize?: number): Observable<Beer[]> {
    if (pageNumber && pageSize) {
      return this.http.get<Beer[]>(this.url + `?page=${pageNumber}&per_page=${pageSize}`);
    } else {
      return this.http.get<Beer[]>(this.url);
    }
  }

  /**
   * Returns a beer that matches the passed id
   * @param id id of the beer to search
   */
  public getBeerById(id: number): Observable<Beer> {
    return this.http.get<Beer>(this.url + '/' + id);
  }

  /**
   * Returns an array with only 1 element, a random beer
   */
  public getRandomBeer(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.url + '/random');
  }

  /**
   * Returns all the beers that match the passed name
   * @param name name of the beer to search
   */
  public searchByBeerName(name: string): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.url + `?beer_name=${name}`);
  }

  /**
   * Given the parameters passed it will search all the beers that match them.
   * @param searchParams query parameters to filter the beers.
   */
  public advancedBeerSearch(searchParams: BeerAdvancedSearch): Observable<Beer[]> {
    let queryParamString = '?';
    Object.entries(searchParams).forEach((param) => {
      if (param[1] != null && param[1] !== '') {
        queryParamString += param[0] + '=' + param[1] + '&';
      }
    });
    return this.http.get<Beer[]>(this.url + queryParamString);
  }




}
