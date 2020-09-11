// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  worldskillsAppId: 400,
  worldskillsPeopleAppId: 600,
  worldskillsApi: 'https://api.worldskills.show',
  worldskillsApiOrg: 'https://api.worldskills.show/org',
  worldskillsApiEvents: 'https://api.worldskills.show/events',
  worldskillsApiImages: 'https://api.worldskills.show/images',
  worldskillsClientId: '226ffe50bf11',
  worldskillsAuthorizeUrl: 'https://auth.worldskills.show/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:11310/',
  worldskillsAuthorizeUserinfoEndpoint: 'https://auth.worldskills.show/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['api.worldskills.show'],
  environmentWarning: 'This is the local development environment. Happy coding!',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
