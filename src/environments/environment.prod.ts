export const environment = {
  production: true,
  firebase: {
    projectId: 'twan-cloud',
    appId: '1:426254144796:web:dfe97bbfaf5f647e98d6d9',
    storageBucket: 'twan-cloud.appspot.com',
    locationId: 'asia-southeast2',
    apiKey: 'AIzaSyBoO7UeDwfesYEHEW5sWcpp8N9XX7nJ_dE',
    authDomain: 'twan-cloud.firebaseapp.com',
    messagingSenderId: '426254144796',
    measurementId: 'G-PPLF700EZZ',
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
