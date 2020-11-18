import { Component } from '@angular/core';
import { AppComponentService } from './app-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'PerformanceReview';
    constructor(
        private appComponentService: AppComponentService,
    ) {}

    get currentLoggedIn(): boolean {
        return this.appComponentService.checkAuthentication();
    }

    logout(): void {
        this.appComponentService.logout();
    }
}
