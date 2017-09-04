import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FoursquareProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FoursquareProvider {

  endpoint;

  constructor(public http: Http) {
    this.endpoint = 'https://api.foursquare.com/v2/';
  }

  searchVenue(params) {
    const queryString = this.serialize(params);
    return this.http.get(this.endpoint + 'venues/search?' + queryString)
      .map((response) => response.json());
  }

  serialize(obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }

}
