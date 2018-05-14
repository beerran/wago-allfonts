// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCXoobODxSa6mJRFS_oVa8V3lB-SimK0sI',
    authDomain: 'wago-allfonts.firebaseapp.com',
    databaseURL: 'https://wago-allfonts.firebaseio.com',
    projectId: 'wago-allfonts',
    storageBucket: 'wago-allfonts.appspot.com',
    messagingSenderId: '669733700862'
  }
};
