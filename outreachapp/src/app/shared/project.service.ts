import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private httpClient: HttpClient) { }


  // Http Requests
  // Add New User
  findAndIUProjects(body) {
    console.log(JSON.stringify(body));
    return this.httpClient.post(environment.apiBaseUrl + '/addBulkProjects', body);
  }


}
