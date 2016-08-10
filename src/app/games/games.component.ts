/**
 * Created by igor.kuzko on 25.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/dataService";
import {ActivatedRoute, Router} from "@angular/router";
import {StreamComponent} from "../shared/components/streamItem/stream.component";

@Component({
    moduleId: module.id,
    selector: 'games',
    templateUrl: 'games.component.html',
    styleUrls: ['games.component.css'],
    directives: [ StreamComponent ]
})
export class GamesComponent implements OnInit {
    gamesTop: any[];
    gameStreams: any[];
    private sub: any;
    gameName: string;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.gameName = params['gameName'];
            if (this.gameName) {
                this.gameName = decodeURIComponent(this.gameName);
                this.dataService.getStreamsByGame(this.gameName).subscribe(gameStreams => this.gameStreams = gameStreams.streams);
            } else {
                this.dataService.getTopGames().subscribe(gamesTop => this.gamesTop = gamesTop.top);
            }
        });
    }

    onGameSelect(gameName) {
        this.router.navigate(['/games', encodeURIComponent(gameName)]);
    }

    onStreamSelect(stream) {
        this.router.navigate(['/channel', stream.name.trim()]);
    }

}