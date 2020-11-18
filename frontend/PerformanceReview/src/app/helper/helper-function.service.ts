import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionService {

  constructor() { }

  static getHeaders(): HttpHeaders {
      const params = {
          'Content-Type': 'application/json',
      }
      return new HttpHeaders(params);
  }

  static confirm(message?: string) {
    return new Promise<boolean>((resolve, reject) =>
        resolve(window.confirm(message || 'Is it OK?')));
    }
}
