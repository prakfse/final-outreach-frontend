import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RpteventService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private httpClient: HttpClient) { }

  getRptEventInfo() {
    // return this.httpClient.get(environment.apiBaseUrl +'/getEvents');
    return this.httpClient.get(environment.apiEventRptUrl + '/getEventSummary');
  }
}
