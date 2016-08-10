import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {DataService} from "../shared/services/dataService";
import {AuthService} from "../shared/services/authService";
import {CacheService} from "../shared/services/cacheService";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [ ROUTER_DIRECTIVES ],
    providers: [DataService, AuthService, CacheService]
})
export class AppComponent implements OnInit {
    private user;

    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private cacheService: CacheService
    ) {}

    ngOnInit() {
        // this.initUser();
        this.loadInitialGameData();
    }

    login() {
        this.authService.authenticate();
    }

    private initUser() {
        this.user = this.authService.getUser();
        if(!this.user) {
            this.authService.getAuthorization().then(user => {
                this.user = user;
            });
        }
    }

    private loadInitialGameData() {
        this.dataService.getTopGames(100).subscribe(gamesTop => {
            let gamesCache = {};
            gamesTop.top.forEach(gameObj => {
                gamesCache[gameObj['game']['name']] = gameObj['game'];
            });
            this.cacheService.setCacheData('gamesData', gamesCache);
        });
    }
}
