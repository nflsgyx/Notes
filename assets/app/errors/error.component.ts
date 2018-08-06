import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    if (error.message=="jwt must be provided"){
                      this.error.message = "Please sign in to view and take down your notes."
                    } else if (error.message=="Invalid login credentials"){
                      this.error.message = "Incorrect email address or password."
                    }
                    this.display = 'block';
                }
            );
    }
}
