# Whitbread - ANDigital Coding Exercise

A live firebase link is available here: 
https://foursquare-ba567.firebaseapp.com/

This project was using Ionic 3.6.0.

# Summary
- Foursquare requires you to either enter Latitude/Longitude pair or simply a location area as a string so that it can provide results close to that location. So i've decided as soon as the app loads to the request the users location using the HTML geolocation api and handle the responses appropiately.

- Once the app has returned the users long/lat pair, we store this value globally and enable the search input.

- Once the user types in a search location we send a request to our service to fetch the data from the foursquare venue search api endpoint.

- Once we have received a response, we loop through the results and display them in a simple list. In addition we also setup Google Map markers which is relevant to that list and add alert boxes when a user clicks one of these markers with some basic actions to interact with the location.

# Installation
To install simply run the following command with either yarn or npm (Yarn is used specifically in this demo):
Yarn - `yarn install` or simply `yarn` 
npm - `npm install`

# Run Locally
Simply run `yarn run ionic:serve` or `npm run ionic:serve`. This will load a local development server and open a new tab to view the app.