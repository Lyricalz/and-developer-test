import { FoursquareProvider } from './../../providers/foursquare/foursquare';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  results = [];
  query: string = '';

  constructor(
    public navCtrl: NavController,
    public foursquare: FoursquareProvider) {
  }

  ionViewDidLoad() {
  }

  search(term) {
    console.log(term);
    this.foursquare.searchVenue(term).subscribe(data => {
      this.results = data;
    });
  }

}
