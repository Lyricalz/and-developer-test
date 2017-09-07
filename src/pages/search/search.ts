import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { FoursquareProvider } from './../../providers/foursquare/foursquare';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

declare var google: any;

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;

  venues = [];
  query: string = '';
  ll;
  loading;
  locationFetched = false;
  map;
  markers;

  constructor(
    public navCtrl: NavController,
    public foursquare: FoursquareProvider,
    public geo: GeolocationProvider,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.promptLocation();
    this.loading = this.loadCtrl.create({
      spinner: 'dots',
      content: 'Just fetching your location..'
    });
    this.loading.present();
  }

  initMap() {
    this.markers = [];
    let mapEle = this.mapElement.nativeElement;

    this.map = new google.maps.Map(mapEle, {
      center: { lat: this.ll.lat, lng: this.ll.lng },
      zoom: 5
    });
  }

  promptLocation() {
    this.geo.getCurrentPosition()
      .then((data) => {
        this.ll = { lat: data['coords']['latitude'], lng: data['coords']['longitude'] };
        this.locationFetched = true;
        this.loading.dismiss();
        this.initMap();
      })
      .catch((error) => {
        this.locationFetched = false;
        this.loading.dismiss();
        let errorAlert = this.alertCtrl.create({
          title: 'Error',
          message: error.msg,
          enableBackdropDismiss: false
        });
        errorAlert.present();
      });
  }

  search(term) {
    if (!this.locationFetched) {
      return;
    }
    let params = { query: term, ll: `${this.ll.lat}, ${this.ll.lng}` };
    this.foursquare.searchVenue(params).subscribe(data => {
      this.venues = data.response.venues;
      if (this.venues[0]) {
        this.addPins();
        this.map.setCenter({ lat: this.venues[0].location.lat, lng: this.venues[0].location.lng });
        this.map.setZoom(12);
      }
      console.log(this.venues);
    });
  }

  addPins() {
    this.clearPins();

    this.venues.forEach((venue) => {
      if (!venue.location.lat && !venue.location.lng) {
        return;
      }

      let marker = new google.maps.Marker({
        position: { lat: venue.location.lat, lng: venue.location.lng },
        map: this.map,
        animation: google.maps.Animation.DROP
      });

      this.markers.push(marker);

      marker.addListener('click', () => {
        let infoWindowAlert = this.alertCtrl.create({
          title: `${venue.name} - ${venue.location.address}`,
          subTitle: 'Choose an option',
          buttons: [
            {
              text: 'Directions',
              handler: () => {
                let formattedAddress = venue.location.formattedAddress.join(', ');
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${formattedAddress}`, '', 'width=600,height=400');
              }
            },
            {
              text: 'Website',
              handler: () => {
                window.open(venue.url, '_blank');
              }
            }
          ]
        });
        infoWindowAlert.present();
      });

    });

  }

  clearPins() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
