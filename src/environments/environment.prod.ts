export const environment = {
  production: true,
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
  apiServer: 'http://localhost:3000/'
};
