// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: "http://172.18.2.50:6006/api",
  apiEventRptUrl: "http://172.18.2.50:6014/api",
  apiEventUrl: "http://172.18.2.50:6002/api",
  apiBulkEventRegUrl: "http://172.18.2.50:6003/api",
  apiEventMgntUrl: "http://172.18.2.50:6004/api",
  apiUserUrl: "http://172.18.2.50:6005/api" 
};

/*export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:6006/api",
  apiEventRptUrl: "http://localhost:6014/api",
  apiEventUrl: "http://localhost:6002/api",
  apiBulkEventRegUrl: "http://localhost:6003/api",
  apiEventMgntUrl: "http://localhost:6004/api",
  apiUserUrl: "http://localhost:6005/api" 
}; */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
