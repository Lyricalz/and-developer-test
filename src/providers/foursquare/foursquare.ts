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
  client_id;
  client_secret;

  constructor(public http: Http) {
    this.endpoint = 'https://api.foursquare.com/v2/';
    this.client_id = 'W4RTK14ILRQKSHMOIRZY4E1G3NQQDHAE5UEVTVP4KOQU5UOE';
    this.client_secret = 'ECEMMANOOBBY1KZ3WOJFPNF2KIPJBRAXVNURG2F4CI31Y3WR';
  }

  searchVenue(params) {
    const queryString = this.serialize(params);
    return this.http.get(this.endpoint + 'venues/search?' + queryString)
      .map((response) => response.json());
  }

  serialize(obj) {
    obj['client_id'] = this.client_id;
    obj['client_secret'] = this.client_secret;
    obj['v'] = '20161016';
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }

}
