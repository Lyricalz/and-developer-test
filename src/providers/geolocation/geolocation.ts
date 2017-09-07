import { Injectable } from '@angular/core';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  err_messages = {
    1: 'You need to give your browser permissions to use geolocation, please do so then refresh the app.',
    2: 'We are currently unable to get your location, please try again shortly.',
    3: 'We are experiencing problems getting your location quickly, please try again shortly.'
  };

  constructor() {
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(`Your browser doesn't support geolocation`);
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
        resolve(pos);
      }, (err) => {
        console.log(err);
        let response = { msg: this.err_messages[err.code], apiError: err };
        reject(response);
      });
    });
  }

}
