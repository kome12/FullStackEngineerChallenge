import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HelperFunctionService } from '../helper/helper-function.service';

import { BACKEND_API } from '../app-component.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private httpClient: HttpClient
  ) { }

  login(email: string, password: string) {
      const link: string = `${BACKEND_API}/login`;
      const headers: HttpHeaders = HelperFunctionService.getHeaders();
      const jsonData: string = JSON.stringify({ email: email, password: password });
      let options = { headers: headers };
      return this.httpClient.post(link, jsonData, options);
  }
}
