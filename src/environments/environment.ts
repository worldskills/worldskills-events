// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  worldskillsAppId: 400,
  worldskillsApi: 'http://localhost:8080',
  worldskillsApiOrg: 'http://localhost:8080/org',
  worldskillsApiEvents: 'http://localhost:8080/events',
  worldskillsApiImages: 'http://localhost:8080/images',
  worldskillsClientId: '269f5d2',
  worldskillsAuthorizeUrl: 'http://localhost:50300/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:10400/',
  worldskillsAuthorizeUserinfoEndpoint: 'http://localhost:8080/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['localhost:8080'],
  environmentWarning: 'This is the local development environment. Happy coding!',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
