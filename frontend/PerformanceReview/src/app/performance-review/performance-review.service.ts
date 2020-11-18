import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HelperFunctionService } from '../helper/helper-function.service';

import { PerformanceReview } from './performanceReview.model';
import { BACKEND_API } from '../app-component.service';

@Injectable({
    providedIn: 'root'
})
export class PerformanceReviewService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    getPerformanceReviews() {
        const link: string = `${BACKEND_API}/performanceReviews`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const options = { headers: headers };
        return this.httpClient.get(link, options);
    }

    createPerformanceReview(performanceReview: PerformanceReview) {
        const link: string = `${BACKEND_API}/performanceReview/`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const jsonData: string = JSON.stringify(performanceReview);
        let options = { headers: headers };
        return this.httpClient.post(link, jsonData, options);
    }

    updatePerformanceReview(performanceReview: PerformanceReview) {
        const link: string = `${BACKEND_API}/performanceReview/${performanceReview._id}`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const jsonData: string = JSON.stringify(performanceReview);
        let options = { headers: headers };
        return this.httpClient.put(link, jsonData, options);
    }
}
