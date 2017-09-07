import { HttpModule } from '@angular/http';
import { SearchPage } from '../pages/search/search';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FoursquareProvider } from '../providers/foursquare/foursquare';
import { GeolocationProvider } from '../providers/geolocation/geolocation';

@NgModule({
  declarations: [
    MyApp,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FoursquareProvider,
    GeolocationProvider
  ]
})
export class AppModule { }
