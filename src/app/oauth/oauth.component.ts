/**
 * Created by igor.kuzko on 22.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/authService";

@Component({
    moduleId: module.id,
    selector: 'oauth',
    template: ''
})
export class OauthComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.parseHash();
        this.router.navigate(['/games']);
    }

    private parseHash() {
        let hash = window.location.hash.substring(1).split('&');
        if (hash.length) {
            hash.forEach((part) => {
                let parts = part.split('=');
                if (parts[0] == 'access_token') {
                    this.authService.setToken(parts[1]);
                }
                if (parts[0] == 'scope') {
                    this.authService.setScope(parts[1]);
                }
            });
        }
    }
}