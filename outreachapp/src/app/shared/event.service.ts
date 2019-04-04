import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private httpClient: HttpClient) { }

  @Output() public newEvents = new EventEmitter<any>();

  // Http Requests
  // Add New User
  addEvent(body) {
    return this.httpClient.post(environment.apiEventUrl + '/addEvent', body);
  }

  addBulkEvents(body) {
    // return this.httpClient.post(environment.apiBaseUrl +'/addEvents', body, this.noAuthHeader );
    console.log('Bulk Event Upload: ' + environment.apiBulkEventRegUrl);
    console.log('Data: ' + JSON.stringify(body));
    
    return this.httpClient.post(environment.apiBulkEventRegUrl + '/asyncAddEvents', body);
  }



  bulkUserReg(body) {
    // return this.httpClient.post(environment.apiBaseUrl +'/addEvents', body, this.noAuthHeader );
    return this.httpClient.post(environment.apiBaseUrl + '/bulkUserRegistration', body);
  }

  postEventsBulkUpdate(body) {
    return this.httpClient.post(environment.apiBaseUrl + '/bulkEventPostUpdates', body);
  }



  // Get the User List from User collections 
  getProjects() {
    return this.httpClient.get(environment.apiBaseUrl + '/getProjects');
  }

  // Get the User List from User collections 
  getProjectNames() {
    return this.httpClient.get(environment.apiBaseUrl + '/getProjectNames');
  }

  // Get the User List from User collections 
  getCouncils() {
    return this.httpClient.get(environment.apiBaseUrl + '/getCouncils');
  }

  // Get the User List from User collections 
  getBaseLocations() {
    return this.httpClient.get(environment.apiBaseUrl + '/getLocations');
  }

  // Get the User List from User collections 
  getEvents() {
    return this.httpClient.get(environment.apiEventUrl + '/getEventDetails');
  }

  getPendingEvents() {
    return this.httpClient.get(environment.apiEventMgntUrl + '/getPendingEvents');
  }


  getBUNames() {
    return this.httpClient.get(environment.apiBaseUrl + '/getBusinessUnits');
  }
  // Get the User List from User collections 
  getEventsByUser(pUser: string) {
    // return this.httpClient.get(environment.apiBaseUrl +'/getEvents');
    return this.httpClient.get(environment.apiBaseUrl + '/procEventDet');
  }

  // Get the User List from User collections 
  getEventsForReg() {
    // return this.httpClient.get(environment.apiBaseUrl +'/getEvents');
    return this.httpClient.get(environment.apiBaseUrl + '/getEventDetailsForRegUsers');
  }

  getEventListByUser(userId: string) {
    // return this.httpClient.get(environment.apiBaseUrl +'/getEvents');
    return this.httpClient.get(environment.apiEventUrl + '/getEventDetailsByUser/' + userId);
  }


  getEvent(eventId: string) {
    // return this.httpClient.get(environment.apiBaseUrl +'/getEvent/' + eventId);
    return this.httpClient.get(environment.apiEventUrl + '/getEventDetailById/' + eventId);
  }

  updateEventDet(eventId: string, body: any) {
    // console.log("updateEventDet - Inside");
    return this.httpClient.post(environment.apiEventUrl + '/updateEvent/' + eventId, body);
  }


  deleteEventDet(eventId: string) {
    // console.log("deleteEventDet - Inside");
    return this.httpClient.delete(environment.apiEventUrl + '/deleteEvent/' + eventId);
  }

  registerEvent(body: any) {
    console.log("registerUser - Inside");
    return this.httpClient.post(environment.apiBaseUrl + '/regUser', body);
  }

  unRegisterUser(body: any) {
    console.log("unRegisterUser - Inside");
    return this.httpClient.post(environment.apiBaseUrl + '/unRegUser', body);
  }

  updateBulkEventStatus(eveStatus: string, userID: string, body: any) {
    console.log("updateBulkEventDet - Inside");
    return this.httpClient.post(environment.apiEventMgntUrl + '/updateBulkEventStatus/' + eveStatus + "/" + userID, body);
  }

}


