// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mongoUrl: 'mongodb+srv://dev:B15m1ll4h@cluster0.kmzrv6z.mongodb.net/sipentol?retryWrites=true&w=majority',
  firebase: {
    apiKey: "AIzaSyD-ijG3DwlbJ_OOFznrFaK3v7Zpxkgqb9g",
    authDomain: "sipentol-brebes.firebaseapp.com",
    databaseURL: "https://sipentol-brebes-default-rtdb.firebaseio.com",
    projectId: "sipentol-brebes",
    storageBucket: "sipentol-brebes.appspot.com",
    messagingSenderId: "185929603062",
    appId: "1:185929603062:web:58883705e8567a9c68d9d7",
    measurementId: "G-8N4GHD39EN"
  }
};
