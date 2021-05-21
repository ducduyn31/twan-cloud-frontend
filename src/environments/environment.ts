// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBoO7UeDwfesYEHEW5sWcpp8N9XX7nJ_dE',
    authDomain: 'twan-cloud.firebaseapp.com',
    projectId: 'twan-cloud',
    storageBucket: 'twan-cloud.appspot.com',
    messagingSenderId: '426254144796',
    appId: '1:426254144796:web:dfe97bbfaf5f647e98d6d9',
    measurementId: 'G-PPLF700EZZ'
  },
  sideNav: {
    dashboard: {
      name: 'Dashboard',
      url: '',
      children: [],
    },
    memberManagement: {
      name: 'Member Management',
      url: 'members',
      children: []
    },
    defaultNetwork: {
      name: 'Default Network',
      url: 'detail',
      children: []
    },
  },
  apiServer: 'https://api.twan.techqila.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
